/**
 * Sistema de Gestión de Cursos Online (Online Course Management System)
 */
class Course {
    constructor(courseId, title, instructor, duration, price) {
        if (courseId.trim() === '' || typeof courseId !== 'string') throw new Error("Course ID is required");
        if (title.trim() === '' || typeof title !== 'string') throw new Error("Course title is required");
        if (instructor.trim() === '' || typeof instructor !== 'string') throw new Error("Course title is required");
        if (duration <= 0) throw new Error("Course duration must be greater than 0");
        if (price <= 0) throw new Error("Course price must be greater than 0");

        this.enrolledStudents = []
        this.lessons = []
        this.courseId = courseId
        this.title = title
        this.instructor = instructor
        this.duration = duration
        this.price = price

    }

    enrollStudent(student) {
        if (!(student instanceof Student)) throw new Error("Student must be an instance of Student");
        if (this.enrolledStudents.find(stu => stu.studentId === student.studentId)) throw new Error("Student already enrolled");

        if (this.enrolledStudents.length === 0 || this.enrolledStudents.find(stu => stu.studentId === student.studentId) === undefined) this.enrolledStudents.push(student)

        return this.enrollStudent.length

    }

    addLesson(lessonTitle, duration) {
        if (typeof lessonTitle !== 'string') throw new Error("lessonTitle is required");
        if (duration <= 0) throw new Error("Lesson duration must be greater than 0");

        this.lessons.push({
            lessonTitle: lessonTitle,
            duration: duration
        })
        return this.lessons.length
    }

    getTotalLessons() {
        return this.lessons.length
    }

    getTotalDuration() {
        return this.lessons.reduce((acumulador, lesson) => {
            return acumulador + (lesson.duration)
        }, 0)
    }

    getEnrollmentCount() {
        return this.enrollStudent.length
    }

    getCompletionRate() {
        const studentsAproved = this.enrolledStudents.filter(stu => {
            return stu.completedCourses.find(curse => curse === this.courseId)
        }).length


        return parseFloat(((studentsAproved / this.enrolledStudents.length) * 100).toFixed(2))
    }
}

class Student {
    constructor(studentId, name, email) {
        if (studentId.trim() === '' || typeof studentId !== 'string') throw new Error("Student ID is required");
        if (name.trim() === '' || typeof name !== 'string') throw new Error("name is required");
        if (email.trim() === '' || typeof email !== 'string') throw new Error("email is equired");


        this.enrolledCourses = []
        this.completedCourses = []
        this.progress = {}
        this.studentId = studentId
        this.name = name
        this.email = email
    }

    enrollInCourse(course) {
        if (!(course instanceof Course)) throw new Error("Course must be an instance of Course");
        if (this.enrolledCourses.find(curse => curse.courseId === course.courseId) === undefined) {
            this.enrolledCourses.push(course)
            this.progress[course.courseId] = 0
        } else throw new Error("course already exist");



        return this.enrolledCourses.length
    }

    completeCourse(courseId) {
        if (courseId.trim === '' || typeof courseId !== 'string') throw new Error("courseID is required");

        const validation = this.enrolledCourses.find(cour => {
            return cour.courseId === courseId
        })
        if (validation !== undefined) {
            if (this.completedCourses.includes(courseId)) throw new Error("no puedes completar un curso completado");
            else {
                this.completedCourses.push(courseId)
                this.progress[courseId] = 100
            }

        }

        return this.completedCourses.length

    }

    updateProgress(courseId, percentage) {
        if (courseId.trim === '' || typeof courseId !== 'string') throw new Error("courseID is required");
        if (percentage <= 0 || percentage >= 100) throw new Error("Progress must be between 0 and 100");

        const validation = this.enrolledCourses.find(cour => {
            return cour.courseId === courseId
        })

        if (validation !== undefined) return this.progress[courseId] = percentage
        else throw new Error("Not enrolled in this course");



    }

    getProgress(courseId) {
        if (courseId.trim === '' || typeof courseId !== 'string') throw new Error("courseID is required");
        const validation = this.enrolledCourses.find(cour => {
            return cour.courseId === courseId
        })

        if (validation !== undefined) return this.progress[courseId]
    }

    getTotalCoursesEnrolled() {
        return this.enrolledCourses.length
    }

    getCompletionRate() {
        const totalcourse = this.enrolledCourses.length
        const totalCompleted = this.completedCourses.length
        return parseFloat(((totalCompleted / totalcourse) * 100).toFixed(2))
    }
}

class LearningPlatform {
    constructor(name) {
        if (name.trim() === '' || typeof name !== 'string') throw new Error("Platform name is required");

        this.name = name
        this.courses = []
        this.students = []

    }

    addCourse(course) {
        if (!(course instanceof Course)) throw new Error("Course must be an instance of Course");
        const validación = this.courses.find(cour => cour.courseId === course.courseId)

        if (validación !== undefined) throw new Error("Course already exists");
        else this.courses.push(course)

        return this.courses.length
    }

    registerStudent(student) {
        if (!(student instanceof Student)) throw new Error("Student must be an instance of Course");
        const validation = this.students.find(stu => stu.studentId === student.studentId)

        if (validation !== undefined) throw new Error("Student already exists");
        else this.students.push(student)

        return this.students.length
    }

    getCoursesByInstructor(instructor) {
        return this.courses.filter(cour => cour.instructor === instructor)

    }

    getMostPopularCourse() {
        let mostPopular = this.courses.reduce((acumulador, cour) => {
            let courseid = cour.courseId
            let numberStudent = cour.enrolledStudents.length

            if (acumulador[courseid] === undefined) acumulador[courseid] = numberStudent


            return acumulador
        }, {})

        console.log(mostPopular)

        const max = Object.entries(mostPopular)
        const maxArry = max.find(arry => {
            let most = 0
            if (most === 0 || most < arry[2]) most = arry[1]
            return most
        })

        const MostPopularObjet = this.courses.find(cour => cour.courseId === maxArry[0])

        return MostPopularObjet
    }

    getTotalRevenue() {
        return this.students.reduce((acumulador, student) => {
            const pay = student.enrolledCourses.reduce((acumulador2, payPerCourse) => {

                return acumulador2 + payPerCourse.price
            }, 0)
            return acumulador + pay
            // console.log(coursePrice)

        }, 0)

    }

    getAverageCompletionRate() {
        return parseFloat((this.students.map(student => student.getCompletionRate()).reduce((a, b) => a + b) / this.students.length).toFixed(2))
    }

    getStudentStatistics(studentId) {
        const student = this.students.find(estudent => estudent.studentId === studentId)

        return {
            studentId: student.studentId,
            enrolledCourses: student.enrolledCourses.length,
            completedCourses: student.completedCourses.length,
            progress: student.progress,
            // name: student.name,
            // email : student.email
        }
    }
}


// const photografi = new Course('1', 'Curso de Fotografia', 'Rosangel Rodriguez', 231, 400)
// const cartas = new Course('2', 'Curso de cartas', 'Rosangel Rodriguez', 231, 2000)
// const student1 = new Student('1', 'Erick Toro', 'ellacrita@gmail.com')
// const student2 = new Student('2', 'Carlos TOro', 'acrita@gmail.com')
// console.log(photografi.enrollStudent(student1))
// console.log(photografi.enrollStudent(student2))
// console.log(photografi.addLesson('clase 1: La muerte', 22))
// console.log(photografi.addLesson('clase 2: camara', 10))
// console.log(photografi.getTotalLessons())
// console.log(photografi.getTotalDuration())
// console.log(photografi.getEnrollmentCount())
// console.log(photografi.getCompletionRate())

// console.log(photografi)


// console.log(student1.enrollInCourse(photografi))
// console.log(student2.enrollInCourse(photografi))
// console.log(student1.enrollInCourse(cartas))
// console.log(student1.completeCourse('1'), 'aqui')
// console.log(student1.completeCourse('2'), 'aqui')
// console.log(student1.updateProgress('1', 20))
// console.log(student1.getProgress('1'))
// console.log(student1.getTotalCoursesEnrolled())
// console.log(student1.getCompletionRate())
// console.log(student1)


// const cursera = new LearningPlatform('cursera')
// console.log(cursera.addCourse(photografi))
// console.log(cursera.addCourse(cartas))
// console.log(cursera.registerStudent(student1))
// console.log(cursera.registerStudent(student2))
// console.log(cursera.getCoursesByInstructor('Rosangel Rodriguez'))
// console.log('/////////////')
// console.log('/////////////')
// console.log(cursera.getMostPopularCourse())
// console.log('/////////////')
// console.log('/////////////')
// console.log(cursera.getTotalRevenue())
// console.log(cursera.getAverageCompletionRate())
// console.log(cursera)
// console.log(cursera.getStudentStatistics('2'))
// console.log('//////////////////////')
// console.log(cursera.students.map(stu => cursera.getStudentStatistics(stu.studentId)))

const course = new Course('C001', 'JS Basics', 'John', 20, 99.99);
const student1 = new Student('S001', 'Juan', 'juan@email.com');
const student2 = new Student('S002', 'Pedro', 'pedro@email.com');
const student3 = new Student('S003', 'Maria', 'maria@email.com');
const student4 = new Student('S004', 'Ana', 'ana@email.com');

// Los estudiantes deben inscribirse en ambos sentidos
student1.enrollInCourse(course);
student2.enrollInCourse(course);
student3.enrollInCourse(course);
student4.enrollInCourse(course);

course.enrollStudent(student1);
course.enrollStudent(student2);
course.enrollStudent(student3);
course.enrollStudent(student4);

student1.completeCourse('C001');
student2.completeCourse('C001');
console.log(course.getCompletionRate())
console.log(course.enrolledStudents)



module.exports = { Course, Student, LearningPlatform };
