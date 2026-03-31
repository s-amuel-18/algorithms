const { Subscription, Subscriber, SubscriptionService } = require('./exercise');

describe('Sistema de Gestión de Suscripciones', () => {
    describe('Casos básicos', () => {
        test('debe crear una suscripción con propiedades correctas', () => {
            // Propósito: Verificar que el constructor asigna correctamente las propiedades iniciales
            // Entrada: new Subscription('Premium', 50, 12) - Crear suscripción con nombre, precio y duración
            // Esperado: La suscripción debe tener planName='Premium', price=50, duration=12, features=[], startDate=null
            const subscription = new Subscription('Premium', 50, 12);
            expect(subscription.planName).toBe('Premium');
            expect(subscription.price).toBe(50);
            expect(subscription.duration).toBe(12);
            expect(subscription.features).toEqual([]);
            expect(subscription.startDate).toBeNull();
        });

        test('debe calcular correctamente el costo total del plan', () => {
            // Propósito: Verificar que calculateTotalCost calcula precio × duración correctamente
            // Entrada: Subscription('Basic', 30, 6) - Plan de $30/mes por 6 meses
            // Esperado: Debe retornar 180.00 (30 × 6)
            const subscription = new Subscription('Basic', 30, 6);
            expect(subscription.calculateTotalCost()).toBe(180.00);
        });

        test('debe crear un suscriptor con propiedades correctas', () => {
            // Propósito: Verificar que el constructor de Subscriber asigna correctamente las propiedades
            // Entrada: new Subscriber('S001', 'Juan', 'juan@email.com') - Crear suscriptor con ID, nombre y email
            // Esperado: El suscriptor debe tener subscriberId='S001', name='Juan', email='juan@email.com', subscription=null, paymentHistory=[]
            const subscriber = new Subscriber('S001', 'Juan', 'juan@email.com');
            expect(subscriber.subscriberId).toBe('S001');
            expect(subscriber.name).toBe('Juan');
            expect(subscriber.email).toBe('juan@email.com');
            expect(subscriber.subscription).toBeNull();
            expect(subscriber.paymentHistory).toEqual([]);
        });

        test('debe suscribir correctamente a un plan', () => {
            // Propósito: Verificar que subscribe asigna el plan y establece la fecha de inicio
            // Entrada: subscriber.subscribe(plan) - Suscribir a un plan
            // Esperado: Debe retornar true, subscriber.subscription debe ser el plan, plan.startDate debe ser Date
            const subscriber = new Subscriber('S001', 'Juan', 'juan@email.com');
            const plan = new Subscription('Premium', 50, 12);
            const result = subscriber.subscribe(plan);
            
            expect(result).toBe(true);
            expect(subscriber.subscription).toBe(plan);
            expect(plan.startDate).toBeInstanceOf(Date);
        });

        test('debe verificar correctamente si una suscripción está activa', () => {
            // Propósito: Verificar que isActive determina correctamente el estado basado en fechas
            // Entrada: Suscripción con startDate hace 1 mes y duración de 12 meses
            // Esperado: Debe retornar true (aún no ha vencido)
            const subscription = new Subscription('Premium', 50, 12);
            subscription.startDate = new Date();
            subscription.startDate.setMonth(subscription.startDate.getMonth() - 1);
            
            expect(subscription.isActive()).toBe(true);
        });

        test('debe calcular correctamente los días restantes', () => {
            // Propósito: Verificar que getDaysRemaining calcula días hasta vencimiento
            // Entrada: Suscripción de 1 mes iniciada hace 15 días
            // Esperado: Debe retornar aproximadamente 15 días restantes
            const subscription = new Subscription('Premium', 50, 1);
            subscription.startDate = new Date();
            subscription.startDate.setDate(subscription.startDate.getDate() - 15);
            
            const days = subscription.getDaysRemaining();
            expect(days).toBeGreaterThanOrEqual(0);
            expect(days).toBeLessThanOrEqual(31);
        });

        test('debe agregar pagos al historial correctamente', () => {
            // Propósito: Verificar que addPayment registra pagos y retorna el total
            // Entrada: subscriber.addPayment(50, new Date()) - Agregar pago de $50
            // Esperado: Debe retornar 1 y paymentHistory debe contener el pago
            const subscriber = new Subscriber('S001', 'Juan', 'juan@email.com');
            const result = subscriber.addPayment(50, new Date());
            
            expect(result).toBe(1);
            expect(subscriber.paymentHistory).toHaveLength(1);
            expect(subscriber.paymentHistory[0].amount).toBe(50);
        });

        test('debe calcular correctamente el total pagado', () => {
            // Propósito: Verificar que getTotalPaid suma todos los pagos del historial
            // Entrada: Suscriptor con pagos de $50, $30 y $20
            // Esperado: Debe retornar 100.00
            const subscriber = new Subscriber('S001', 'Juan', 'juan@email.com');
            subscriber.addPayment(50, new Date());
            subscriber.addPayment(30, new Date());
            subscriber.addPayment(20, new Date());
            
            expect(subscriber.getTotalPaid()).toBe(100.00);
        });

        test('debe crear un servicio y agregar planes y suscriptores', () => {
            // Propósito: Verificar que SubscriptionService se inicializa y puede agregar elementos
            // Entrada: new SubscriptionService('MyService'), addSubscriptionPlan, registerSubscriber
            // Esperado: El servicio debe tener nombre correcto y los elementos agregados
            const service = new SubscriptionService('MyService');
            const plan = new Subscription('Premium', 50, 12);
            const subscriber = new Subscriber('S001', 'Juan', 'juan@email.com');
            
            expect(service.addSubscriptionPlan(plan)).toBe(1);
            expect(service.registerSubscriber(subscriber)).toBe(1);
            expect(service.name).toBe('MyService');
        });
    });

    describe('Validación de inputs', () => {
        test('debe lanzar error cuando planName está vacío', () => {
            // Propósito: Verificar validación de nombre de plan requerido
            // Entrada: new Subscription('', 50, 12) - Nombre vacío
            // Esperado: Error "Plan name is required"
            expect(() => new Subscription('', 50, 12)).toThrow('Plan name is required');
        });

        test('debe lanzar error cuando price es inválido', () => {
            // Propósito: Verificar validación de precio positivo
            // Entrada: new Subscription('Premium', 0, 12) - Precio inválido
            // Esperado: Error "Subscription price must be greater than 0"
            expect(() => new Subscription('Premium', 0, 12)).toThrow('Subscription price must be greater than 0');
            expect(() => new Subscription('Premium', -10, 12)).toThrow('Subscription price must be greater than 0');
        });

        test('debe lanzar error cuando duration es inválido', () => {
            // Propósito: Verificar validación de duración positiva
            // Entrada: new Subscription('Premium', 50, 0) - Duración inválida
            // Esperado: Error "Subscription duration must be greater than 0"
            expect(() => new Subscription('Premium', 50, 0)).toThrow('Subscription duration must be greater than 0');
        });

        test('debe lanzar error cuando subscriberId está vacío', () => {
            // Propósito: Verificar validación de ID de suscriptor requerido
            // Entrada: new Subscriber('', 'Juan', 'juan@email.com') - ID vacío
            // Esperado: Error "Subscriber ID is required"
            expect(() => new Subscriber('', 'Juan', 'juan@email.com')).toThrow('Subscriber ID is required');
        });

        test('debe lanzar error cuando name está vacío', () => {
            // Propósito: Verificar validación de nombre de suscriptor requerido
            // Entrada: new Subscriber('S001', '', 'juan@email.com') - Nombre vacío
            // Esperado: Error "Subscriber name is required"
            expect(() => new Subscriber('S001', '', 'juan@email.com')).toThrow('Subscriber name is required');
        });

        test('debe lanzar error cuando email está vacío', () => {
            // Propósito: Verificar validación de email requerido
            // Entrada: new Subscriber('S001', 'Juan', '') - Email vacío
            // Esperado: Error "Subscriber email is required"
            expect(() => new Subscriber('S001', 'Juan', '')).toThrow('Subscriber email is required');
        });

        test('debe lanzar error al suscribir con instancia inválida', () => {
            // Propósito: Verificar validación de instancia de Subscription
            // Entrada: subscriber.subscribe({}) - Objeto inválido
            // Esperado: Error "Subscription must be an instance of Subscription"
            const subscriber = new Subscriber('S001', 'Juan', 'juan@email.com');
            expect(() => subscriber.subscribe({})).toThrow('Subscription must be an instance of Subscription');
        });

        test('debe lanzar error al renovar sin suscripción activa', () => {
            // Propósito: Verificar validación de suscripción activa antes de renovar
            // Entrada: subscriber.renew(6) sin suscripción activa
            // Esperado: Error "No active subscription to renew"
            const subscriber = new Subscriber('S001', 'Juan', 'juan@email.com');
            expect(() => subscriber.renew(6)).toThrow('No active subscription to renew');
        });

        test('debe lanzar error al cancelar sin suscripción activa', () => {
            // Propósito: Verificar validación de suscripción activa antes de cancelar
            // Entrada: subscriber.cancel() sin suscripción activa
            // Esperado: Error "No active subscription to cancel"
            const subscriber = new Subscriber('S001', 'Juan', 'juan@email.com');
            expect(() => subscriber.cancel()).toThrow('No active subscription to cancel');
        });

        test('debe lanzar error cuando payment amount es inválido', () => {
            // Propósito: Verificar validación de monto de pago positivo
            // Entrada: subscriber.addPayment(0, new Date()) - Monto inválido
            // Esperado: Error "Payment amount must be greater than 0"
            const subscriber = new Subscriber('S001', 'Juan', 'juan@email.com');
            expect(() => subscriber.addPayment(0, new Date())).toThrow('Payment amount must be greater than 0');
        });

        test('debe lanzar error cuando payment date no es Date', () => {
            // Propósito: Verificar validación de tipo Date para fecha de pago
            // Entrada: subscriber.addPayment(50, 'invalid') - Fecha inválida
            // Esperado: Error "Payment date must be a Date object"
            const subscriber = new Subscriber('S001', 'Juan', 'juan@email.com');
            expect(() => subscriber.addPayment(50, 'invalid')).toThrow('Payment date must be a Date object');
        });

        test('debe lanzar error cuando featureName no es string', () => {
            // Propósito: Verificar validación de tipo string para nombre de característica
            // Entrada: subscription.hasFeature(123) - Tipo inválido
            // Esperado: Error "Feature name must be a string"
            const subscription = new Subscription('Premium', 50, 12);
            expect(() => subscription.hasFeature(123)).toThrow('Feature name must be a string');
        });

        test('debe lanzar error cuando service name está vacío', () => {
            // Propósito: Verificar validación de nombre del servicio requerido
            // Entrada: new SubscriptionService('') - Nombre vacío
            // Esperado: Error "Service name is required"
            expect(() => new SubscriptionService('')).toThrow('Service name is required');
        });

        test('debe lanzar error al agregar plan duplicado', () => {
            // Propósito: Verificar que no se permiten planes con mismo nombre
            // Entrada: addSubscriptionPlan dos veces con mismo planName
            // Esperado: Error "Subscription plan already exists"
            const service = new SubscriptionService('MyService');
            const plan = new Subscription('Premium', 50, 12);
            service.addSubscriptionPlan(plan);
            expect(() => service.addSubscriptionPlan(new Subscription('Premium', 60, 6))).toThrow('Subscription plan already exists');
        });

        test('debe lanzar error al registrar suscriptor duplicado', () => {
            // Propósito: Verificar que no se permiten suscriptores con mismo ID
            // Entrada: registerSubscriber dos veces con mismo subscriberId
            // Esperado: Error "Subscriber ID already exists"
            const service = new SubscriptionService('MyService');
            const subscriber = new Subscriber('S001', 'Juan', 'juan@email.com');
            service.registerSubscriber(subscriber);
            // service.registerSubscriber(subscriber);
            expect(() => service.registerSubscriber(new Subscriber('S001', 'Pedro', 'pedro@email.com'))).toThrow('Subscriber ID already exists');
        });
    });

    describe('Casos adicionales', () => {
        test('debe renovar suscripción correctamente extendiendo la fecha', () => {
            // Propósito: Verificar que renew extiende la fecha de inicio sumando meses
            // Entrada: Suscripción activa, renew(6) - Renovar por 6 meses adicionales
            // Esperado: La fecha de inicio debe extenderse 6 meses
            const subscriber = new Subscriber('S001', 'Juan', 'juan@email.com');
            const plan = new Subscription('Premium', 50, 12);
            subscriber.subscribe(plan);
            const originalDate = new Date(plan.startDate);
            const newDate = subscriber.renew(6);
            
            expect(newDate.getTime()).toBeGreaterThan(originalDate.getTime());
        });

        test('debe cancelar suscripción correctamente', () => {
            // Propósito: Verificar que cancel elimina la suscripción activa
            // Entrada: Suscriptor con suscripción activa, cancel()
            // Esperado: subscriber.subscription debe ser null después de cancelar
            const subscriber = new Subscriber('S001', 'Juan', 'juan@email.com');
            const plan = new Subscription('Premium', 50, 12);
            subscriber.subscribe(plan);
            subscriber.cancel();
            
            expect(subscriber.subscription).toBeNull();
        });

        test('debe obtener correctamente el estado de suscripción', () => {
            // Propósito: Verificar que getSubscriptionStatus retorna el estado correcto
            // Entrada: Suscriptor con suscripción activa
            // Esperado: Debe retornar 'active'
            const subscriber = new Subscriber('S001', 'Juan', 'juan@email.com');
            const plan = new Subscription('Premium', 50, 12);
            subscriber.subscribe(plan);
            
            expect(subscriber.getSubscriptionStatus()).toBe('active');
        });

        test('debe obtener suscriptores activos correctamente', () => {
            // Propósito: Verificar que getActiveSubscribers filtra solo suscriptores activos
            // Entrada: Servicio con suscriptores activos y no activos
            // Esperado: Debe retornar solo suscriptores con suscripción activa
            const service = new SubscriptionService('MyService');
            const plan = new Subscription('Premium', 50, 12);
            const subscriber1 = new Subscriber('S001', 'Juan', 'juan@email.com');
            const subscriber2 = new Subscriber('S002', 'Pedro', 'pedro@email.com');
            
            subscriber1.subscribe(plan);
            service.registerSubscriber(subscriber1);
            service.registerSubscriber(subscriber2);
            
            const active = service.getActiveSubscribers();
            expect(active).toHaveLength(1);
            expect(active[0]).toBe(subscriber1);
        });

        test('debe obtener suscriptores por plan correctamente', () => {
            // Propósito: Verificar que getSubscribersByPlan filtra suscriptores por plan
            // Entrada: Servicio con suscriptores en diferentes planes
            // Esperado: Debe retornar solo suscriptores del plan especificado
            const service = new SubscriptionService('MyService');
            const plan1 = new Subscription('Premium', 50, 12);
            const plan2 = new Subscription('Basic', 30, 6);
            const subscriber1 = new Subscriber('S001', 'Juan', 'juan@email.com');
            const subscriber2 = new Subscriber('S002', 'Pedro', 'pedro@email.com');
            
            subscriber1.subscribe(plan1);
            subscriber2.subscribe(plan2);
            service.addSubscriptionPlan(plan1);
            service.addSubscriptionPlan(plan2);
            service.registerSubscriber(subscriber1);
            service.registerSubscriber(subscriber2);
            
            const premiumSubscribers = service.getSubscribersByPlan('Premium');
            expect(premiumSubscribers).toHaveLength(1);
            expect(premiumSubscribers[0]).toBe(subscriber1);
        });

        test('debe encontrar el plan más popular correctamente', () => {
            // Propósito: Verificar que getMostPopularPlan identifica el plan con más suscriptores
            // Entrada: Servicio con múltiples planes y suscriptores
            // Esperado: Debe retornar el plan con más suscriptores
            const service = new SubscriptionService('MyService');
            const plan1 = new Subscription('Premium', 50, 12);
            const plan2 = new Subscription('Basic', 30, 6);
            
            const sub1 = new Subscriber('S001', 'Juan', 'juan@email.com');
            const sub2 = new Subscriber('S002', 'Pedro', 'pedro@email.com');
            const sub3 = new Subscriber('S003', 'Maria', 'maria@email.com');
            
            sub1.subscribe(plan1);
            sub2.subscribe(plan1);
            sub3.subscribe(plan2);
            
            service.addSubscriptionPlan(plan1);
            service.addSubscriptionPlan(plan2);
            service.registerSubscriber(sub1);
            service.registerSubscriber(sub2);
            service.registerSubscriber(sub3);
            
            expect(service.getMostPopularPlan()).toBe(plan1);
        });
    });
});

