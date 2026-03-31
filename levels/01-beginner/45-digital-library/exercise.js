class DigitalBook {
    constructor(isbn, title, author, pages, category) {
        if (typeof isbn !== 'string' || isbn.trim().length === 0) {
            throw new Error('Book ISBN is required');
        }
        if (typeof title !== 'string' || title.trim().length === 0) {
            throw new Error('Book title is required');
        }
        if (typeof author !== 'string' || author.trim().length === 0) {
            throw new Error('Book author is required');
        }
        if (typeof pages !== 'number' || pages <= 0) {
            throw new Error('Book pages must be greater than 0');
        }
        if (typeof category !== 'string' || category.trim().length === 0) {
            throw new Error('Book category is required');
        }
        this.isbn = isbn.trim();
        this.title = title.trim();
        this.author = author.trim();
        this.pages = pages;
        this.category = category.trim();
        this.isAvailable = true;
        this.borrowHistory = [];
        this.currentBorrow = null;
    }

    borrow(readerId, borrowDate) {
        if (typeof readerId !== 'string' || readerId.trim().length === 0) {
            throw new Error('Reader ID is required');
        }
        if (!(borrowDate instanceof Date)) {
            throw new Error('Borrow date must be a Date object');
        }
        if (!this.isAvailable) {
            throw new Error('Book is not available');
        }
        this.isAvailable = false;
        this.currentBorrow = { readerId: readerId.trim(), borrowDate };
        return true;
    }

    return(returnDate) {
        if (!(returnDate instanceof Date)) {
            throw new Error('Return date must be a Date object');
        }
        if (this.isAvailable) {
            throw new Error('Book is not currently borrowed');
        }
        if (!this.currentBorrow) {
            throw new Error('No active borrow record');
        }
        if (returnDate < this.currentBorrow.borrowDate) {
            throw new Error('Return date must be after borrow date');
        }
        const days = Math.floor((returnDate - this.currentBorrow.borrowDate) / (1000 * 60 * 60 * 24));
        this.borrowHistory.push({
            ...this.currentBorrow,
            returnDate
        });
        this.isAvailable = true;
        this.currentBorrow = null;
        return days;
    }

    getBorrowCount() {
        return this.borrowHistory.length;
    }

    getAverageBorrowDuration() {
        if (this.borrowHistory.length === 0) return 0;
        const totalDays = this.borrowHistory.reduce((sum, record) => {
            const days = Math.floor((record.returnDate - record.borrowDate) / (1000 * 60 * 60 * 24));
            return sum + days;
        }, 0);
        return parseFloat((totalDays / this.borrowHistory.length).toFixed(2));
    }

    isOverdue(maxDays) {
        if (typeof maxDays !== 'number' || maxDays <= 0) {
            throw new Error('Max days must be greater than 0');
        }
        if (this.isAvailable || !this.currentBorrow) return false;
        const days = Math.floor((new Date() - this.currentBorrow.borrowDate) / (1000 * 60 * 60 * 24));
        return days > maxDays;
    }
}

class Reader {
    constructor(readerId, name, email, borrowLimit = 5) {
        if (typeof readerId !== 'string' || readerId.trim().length === 0) {
            throw new Error('Reader ID is required');
        }
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Reader name is required');
        }
        if (typeof email !== 'string' || email.trim().length === 0) {
            throw new Error('Reader email is required');
        }
        if (typeof borrowLimit !== 'number' || borrowLimit <= 0) {
            throw new Error('Borrow limit must be greater than 0');
        }
        this.readerId = readerId.trim();
        this.name = name.trim();
        this.email = email.trim();
        this.borrowLimit = borrowLimit;
        this.borrowedBooks = [];
        this.borrowHistory = [];
    }

    borrowBook(book) {
        if (!(book instanceof DigitalBook)) {
            throw new Error('Book must be an instance of DigitalBook');
        }
        if (this.borrowedBooks.length >= this.borrowLimit) {
            throw new Error('Borrow limit reached');
        }
        if (this.borrowedBooks.find(b => b.isbn === book.isbn)) {
            throw new Error('Book already borrowed');
        }
        this.borrowedBooks.push(book);
        return true;
    }

    returnBook(isbn) {
        const index = this.borrowedBooks.findIndex(b => b.isbn === isbn);
        if (index === -1) {
            throw new Error('Book not found in borrowed books');
        }
        const book = this.borrowedBooks[index];
        const returnDate = new Date();
        const days = book.return(returnDate);
        this.borrowHistory.push({ isbn, returnDate, days });
        this.borrowedBooks.splice(index, 1);
        return true;
    }

    getBorrowedCount() {
        return this.borrowedBooks.length;
    }

    canBorrowMore() {
        return this.borrowedBooks.length < this.borrowLimit;
    }

    getBorrowHistory() {
        return [...this.borrowHistory];
    }

    getFavoriteCategory() {
        if (this.borrowHistory.length === 0) return null;
        const categoryCount = {};
        this.borrowHistory.forEach(record => {
            const book = this.borrowedBooks.find(b => b.isbn === record.isbn) || 
                        { category: 'Unknown' };
            categoryCount[book.category] = (categoryCount[book.category] || 0) + 1;
        });
        return Object.keys(categoryCount).reduce((a, b) => 
            categoryCount[a] > categoryCount[b] ? a : b
        );
    }
}

class DigitalLibrary {
    constructor(name) {
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Library name is required');
        }
        this.name = name.trim();
        this.books = [];
        this.readers = [];
    }

    addBook(book) {
        if (!(book instanceof DigitalBook)) {
            throw new Error('Book must be an instance of DigitalBook');
        }
        if (this.books.find(b => b.isbn === book.isbn)) {
            throw new Error('Book already exists');
        }
        this.books.push(book);
        return book;
    }

    registerReader(reader) {
        if (!(reader instanceof Reader)) {
            throw new Error('Reader must be an instance of Reader');
        }
        if (this.readers.find(r => r.readerId === reader.readerId)) {
            throw new Error('Reader already registered');
        }
        this.readers.push(reader);
        return reader;
    }

    findBook(isbn) {
        return this.books.find(b => b.isbn === isbn) || null;
    }

    getAvailableBooks() {
        return this.books.filter(b => b.isAvailable);
    }

    getBooksByCategory(category) {
        return this.books.filter(b => b.category === category);
    }

    getMostBorrowedBook() {
        if (this.books.length === 0) return null;
        return this.books.reduce((max, book) => 
            book.getBorrowCount() > max.getBorrowCount() ? book : max
        );
    }

    getOverdueBooks(maxDays = 30) {
        return this.books.filter(b => b.isOverdue(maxDays));
    }

    getLibraryStatistics() {
        return {
            totalBooks: this.books.length,
            totalReaders: this.readers.length,
            availableBooks: this.getAvailableBooks().length,
            borrowedBooks: this.books.filter(b => !b.isAvailable).length,
            totalBorrows: this.books.reduce((sum, b) => sum + b.getBorrowCount(), 0)
        };
    }
}

module.exports = { DigitalBook, Reader, DigitalLibrary };



module.exports = { DigitalBook, Reader, DigitalLibrary };

