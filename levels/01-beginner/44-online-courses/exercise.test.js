const { Course, Student, LearningPlatform } = require('./exercise');

describe('Sistema de Gestión de Cursos Online', () => {
    describe('Casos básicos', () => {
        test('debe crear un curso con propiedades correctas', () => {
            // Propósito: Verificar que el constructor asigna correctamente las propiedades iniciales
            // Entrada: new Course('C001', 'JavaScript Basics', 'John Doe', 20, 99.99)
            // Esperado: El curso debe tener todas las propiedades asignadas correctamente
            const course = new Course('C001', 'JavaScript Basics', 'John Doe', 20, 99.99);
            expect(course.courseId).toBe('C001');
            expect(course.title).toBe('JavaScript Basics');
            expect(course.instructor).toBe('John Doe');
            expect(course.duration).toBe(20);
            expect(course.price).toBe(99.99);
            expect(course.enrolledStudents).toEqual([]);
            expect(course.lessons).toEqual([]);
        });

        test('debe inscribir un estudiante en un curso', () => {
            // Propósito: Verificar que enrollStudent agrega estudiante y retorna el total
            // Entrada: course.enrollStudent(student) - Inscribir estudiante en curso
            // Esperado: Debe retornar 1 y el estudiante debe estar en enrolledStudents
            const course = new Course('C001', 'JS Basics', 'John', 20, 99.99);
            const student = new Student('S001', 'Juan', 'juan@email.com');
            expect(course.enrollStudent(student)).toBe(1);
            expect(course.enrolledStudents).toContain(student);
        });

        test('debe agregar lecciones al curso', () => {
            // Propósito: Verificar que addLesson agrega lecciones y retorna el total
            // Entrada: course.addLesson('Introduction', 2) - Agregar lección con título y duración
            // Esperado: Debe retornar 1 y la lección debe estar en lessons
            const course = new Course('C001', 'JS Basics', 'John', 20, 99.99);
            expect(course.addLesson('Introduction', 2)).toBe(1);
            expect(course.getTotalLessons()).toBe(1);
        });

        test('debe calcular correctamente la duración total de lecciones', () => {
            // Propósito: Verificar que getTotalDuration suma duración de todas las lecciones
            // Entrada: Curso con lecciones de 2, 3 y 5 horas
            // Esperado: Debe retornar 10 horas
            const course = new Course('C001', 'JS Basics', 'John', 20, 99.99);
            course.addLesson('Lesson 1', 2);
            course.addLesson('Lesson 2', 3);
            course.addLesson('Lesson 3', 5);
            expect(course.getTotalDuration()).toBe(10);
        });

        test('debe crear un estudiante con propiedades correctas', () => {
            // Propósito: Verificar que el constructor de Student asigna correctamente las propiedades
            // Entrada: new Student('S001', 'Juan', 'juan@email.com')
            // Esperado: El estudiante debe tener todas las propiedades inicializadas correctamente
            const student = new Student('S001', 'Juan', 'juan@email.com');
            expect(student.studentId).toBe('S001');
            expect(student.name).toBe('Juan');
            expect(student.email).toBe('juan@email.com');
            expect(student.enrolledCourses).toEqual([]);
            expect(student.completedCourses).toEqual([]);
            expect(student.progress).toEqual({});
        });

        test('debe inscribir estudiante en curso correctamente', () => {
            // Propósito: Verificar que enrollInCourse agrega curso y actualiza progreso
            // Entrada: student.enrollInCourse(course) - Inscribir en curso
            // Esperado: El curso debe estar en enrolledCourses y progress debe tener entrada para courseId
            const student = new Student('S001', 'Juan', 'juan@email.com');
            const course = new Course('C001', 'JS Basics', 'John', 20, 99.99);
            student.enrollInCourse(course);
            
            expect(student.enrolledCourses).toContain(course);
            expect(student.progress['C001']).toBe(0);
        });

        test('debe actualizar progreso del estudiante', () => {
            // Propósito: Verificar que updateProgress actualiza el porcentaje de progreso
            // Entrada: student.updateProgress('C001', 50) - Actualizar a 50%
            // Esperado: progress['C001'] debe ser 50
            const student = new Student('S001', 'Juan', 'juan@email.com');
            const course = new Course('C001', 'JS Basics', 'John', 20, 99.99);
            student.enrollInCourse(course);
            student.updateProgress('C001', 50);
            
            expect(student.getProgress('C001')).toBe(50);
        });

        test('debe marcar curso como completado', () => {
            // Propósito: Verificar que completeCourse marca curso como completado y actualiza progreso
            // Entrada: student.completeCourse('C001') - Completar curso
            // Esperado: El courseId debe estar en completedCourses y progress debe ser 100
            const student = new Student('S001', 'Juan', 'juan@email.com');
            const course = new Course('C001', 'JS Basics', 'John', 20, 99.99);
            student.enrollInCourse(course);
            student.completeCourse('C001');
            
            expect(student.completedCourses).toContain('C001');
            expect(student.progress['C001']).toBe(100);
        });

        test('debe crear una plataforma y agregar cursos y estudiantes', () => {
            // Propósito: Verificar que LearningPlatform se inicializa y puede agregar elementos
            // Entrada: new LearningPlatform('MyPlatform'), addCourse, registerStudent
            // Esperado: La plataforma debe tener nombre correcto y los elementos agregados
            const platform = new LearningPlatform('MyPlatform');
            const course = new Course('C001', 'JS Basics', 'John', 20, 99.99);
            const student = new Student('S001', 'Juan', 'juan@email.com');
            
            platform.addCourse(course);
            platform.registerStudent(student);
            
            expect(platform.name).toBe('MyPlatform');
            expect(platform.courses).toContain(course);
            expect(platform.students).toContain(student);
        });

        test('debe calcular correctamente el total de ingresos', () => {
            // Propósito: Verificar que getTotalRevenue calcula ingresos de todos los cursos
            // Entrada: Plataforma con cursos y estudiantes inscritos
            // Esperado: Debe retornar suma de (precio × número de inscritos) de cada curso
            const platform = new LearningPlatform('MyPlatform');
            const course1 = new Course('C001', 'JS Basics', 'John', 20, 100);
            const course2 = new Course('C002', 'Python Basics', 'Jane', 15, 80);
            const student1 = new Student('S001', 'Juan', 'juan@email.com');
            const student2 = new Student('S002', 'Pedro', 'pedro@email.com');
            
            platform.addCourse(course1);
            platform.addCourse(course2);
            platform.registerStudent(student1);
            platform.registerStudent(student2);
            
            student1.enrollInCourse(course1);
            student2.enrollInCourse(course1);
            student1.enrollInCourse(course2);
            
            course1.enrollStudent(student1);
            course1.enrollStudent(student2);
            course2.enrollStudent(student1);
            
            expect(platform.getTotalRevenue()).toBe(280); // (100×2) + (80×1)
        });
    });

    describe('Validación de inputs', () => {
        test('debe lanzar error cuando courseId está vacío', () => {
            // Propósito: Verificar validación de ID de curso requerido
            // Entrada: new Course('', 'Title', 'Instructor', 20, 99.99) - ID vacío
            // Esperado: Error "Course ID is required"
            expect(() => new Course('', 'Title', 'Instructor', 20, 99.99)).toThrow('Course ID is required');
        });

        test('debe lanzar error cuando title está vacío', () => {
            // Propósito: Verificar validación de título requerido
            // Entrada: new Course('C001', '', 'Instructor', 20, 99.99) - Título vacío
            // Esperado: Error "Course title is required"
            expect(() => new Course('C001', '', 'Instructor', 20, 99.99)).toThrow('Course title is required');
        });

        test('debe lanzar error cuando duration es inválida', () => {
            // Propósito: Verificar validación de duración positiva
            // Entrada: new Course('C001', 'Title', 'Instructor', 0, 99.99) - Duración inválida
            // Esperado: Error "Course duration must be greater than 0"
            expect(() => new Course('C001', 'Title', 'Instructor', 0, 99.99)).toThrow('Course duration must be greater than 0');
        });

        test('debe lanzar error cuando price es inválido', () => {
            // Propósito: Verificar validación de precio positivo
            // Entrada: new Course('C001', 'Title', 'Instructor', 20, 0) - Precio inválido
            // Esperado: Error "Course price must be greater than 0"
            expect(() => new Course('C001', 'Title', 'Instructor', 20, 0)).toThrow('Course price must be greater than 0');
        });

        test('debe lanzar error al inscribir estudiante duplicado', () => {
            // Propósito: Verificar que no se permiten estudiantes duplicados en un curso
            // Entrada: enrollStudent dos veces con el mismo estudiante
            // Esperado: Error "Student already enrolled"
            const course = new Course('C001', 'JS Basics', 'John', 20, 99.99);
            const student = new Student('S001', 'Juan', 'juan@email.com');
            course.enrollStudent(student);
            expect(() => course.enrollStudent(student)).toThrow('Student already enrolled');
        });

        test('debe lanzar error cuando studentId está vacío', () => {
            // Propósito: Verificar validación de ID de estudiante requerido
            // Entrada: new Student('', 'Juan', 'juan@email.com') - ID vacío
            // Esperado: Error "Student ID is required"
            expect(() => new Student('', 'Juan', 'juan@email.com')).toThrow('Student ID is required');
        });

        test('debe lanzar error al actualizar progreso sin estar inscrito', () => {
            // Propósito: Verificar validación de inscripción antes de actualizar progreso
            // Entrada: updateProgress en curso no inscrito
            // Esperado: Error "Not enrolled in this course"
            const student = new Student('S001', 'Juan', 'juan@email.com');
            expect(() => student.updateProgress('C001', 50)).toThrow('Not enrolled in this course');
        });

        test('debe lanzar error cuando percentage está fuera de rango', () => {
            // Propósito: Verificar validación de porcentaje entre 0 y 100
            // Entrada: updateProgress con percentage > 100
            // Esperado: Error "Progress must be between 0 and 100"
            const student = new Student('S001', 'Juan', 'juan@email.com');
            const course = new Course('C001', 'JS Basics', 'John', 20, 99.99);
            student.enrollInCourse(course);
            expect(() => student.updateProgress('C001', 150)).toThrow('Progress must be between 0 and 100');
        });

        test('debe lanzar error cuando platform name está vacío', () => {
            // Propósito: Verificar validación de nombre de plataforma requerido
            // Entrada: new LearningPlatform('') - Nombre vacío
            // Esperado: Error "Platform name is required"
            expect(() => new LearningPlatform('')).toThrow('Platform name is required');
        });

        test('debe lanzar error al agregar curso duplicado', () => {
            // Propósito: Verificar que no se permiten cursos con mismo courseId
            // Entrada: addCourse dos veces con mismo courseId
            // Esperado: Error "Course already exists"
            const platform = new LearningPlatform('MyPlatform');
            const course = new Course('C001', 'JS Basics', 'John', 20, 99.99);
            platform.addCourse(course);
            expect(() => platform.addCourse(new Course('C001', 'Other', 'Jane', 15, 80))).toThrow('Course already exists');
        });
    });

    describe('Casos adicionales', () => {
        test('debe calcular correctamente la tasa de finalización del curso', () => {
            // Propósito: Verificar que getCompletionRate calcula porcentaje de estudiantes que completaron
            // Entrada: Curso con 4 estudiantes inscritos, 2 completaron
            // Esperado: Debe retornar 50.00
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
            
            expect(course.getCompletionRate()).toBe(50);
        });

        test('debe encontrar el curso más popular correctamente', () => {
            // Propósito: Verificar que getMostPopularCourse identifica el curso con más inscritos
            // Entrada: Plataforma con múltiples cursos y estudiantes
            // Esperado: Debe retornar el curso con más estudiantes inscritos
            const platform = new LearningPlatform('MyPlatform');
            const course1 = new Course('C001', 'JS Basics', 'John', 20, 100);
            const course2 = new Course('C002', 'Python Basics', 'Jane', 15, 80);
            
            const student1 = new Student('S001', 'Juan', 'juan@email.com');
            const student2 = new Student('S002', 'Pedro', 'pedro@email.com');
            const student3 = new Student('S003', 'Maria', 'maria@email.com');
            
            platform.addCourse(course1);
            platform.addCourse(course2);
            platform.registerStudent(student1);
            platform.registerStudent(student2);
            platform.registerStudent(student3);
            
            student1.enrollInCourse(course1);
            student2.enrollInCourse(course1);
            student3.enrollInCourse(course2);
            
            course1.enrollStudent(student1);
            course1.enrollStudent(student2);
            course2.enrollStudent(student3);
            
            expect(platform.getMostPopularCourse()).toBe(course1);
        });

        test('debe obtener cursos por instructor correctamente', () => {
            // Propósito: Verificar que getCoursesByInstructor filtra cursos por instructor
            // Entrada: Plataforma con cursos de diferentes instructores
            // Esperado: Debe retornar solo cursos del instructor especificado
            const platform = new LearningPlatform('MyPlatform');
            const course1 = new Course('C001', 'JS Basics', 'John', 20, 100);
            const course2 = new Course('C002', 'Python Basics', 'Jane', 15, 80);
            const course3 = new Course('C003', 'Advanced JS', 'John', 25, 150);
            
            platform.addCourse(course1);
            platform.addCourse(course2);
            platform.addCourse(course3);
            
            const johnCourses = platform.getCoursesByInstructor('John');
            expect(johnCourses).toHaveLength(2);
            expect(johnCourses).toContain(course1);
            expect(johnCourses).toContain(course3);
        });
    });
});

