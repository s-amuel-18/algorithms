/**
 * Sistema de Gestión de Suscripciones (Subscription Management System)
 *
 * Descripción: Implementa tres clases básicas (`Subscription`, `Subscriber` y `SubscriptionService`) 
 * para practicar constructores, métodos de instancia, validaciones complejas, manejo de fechas,
 * cálculos de vencimiento y reportes financieros.
 * Dificultad: BEGINNER
 *
 * Principios sugeridos:
 * - KISS: mantener el código simple y expresivo
 * - Validaciones Fail Fast: validar antes de continuar
 * - Responsabilidad Única: cada clase tiene un propósito claro
 * - Uso de métodos de arrays: filter, reduce
 */

/**
 * Representa un plan de suscripción.
 * Traducción: Suscripción
 * @class
 */
class Subscription {
    constructor(planName, price, duration) {
        if (planName.trim() === '' || typeof planName !== 'string') throw new Error("Plan name is required");
        if (price <= 0) throw new Error("Subscription price must be greater than 0");
        if (duration <= 0) throw new Error("Subscription duration must be greater than 0");

        this.features = []
        this.startDate = null
        this.planName = planName
        this.price = price
        this.duration = duration

    }


    isActive() {
        if (this.startDate === null || new Date().getTime() > this.getExpiryDate().getTime()) return false
        else return true
    }

    getDaysRemaining() {
        if (this.getExpiryDate() === null) return 0
        const days = (this.getExpiryDate().getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24)
        return days
    }

    getExpiryDate() {
        if (this.startDate !== null) {
            const copyDate = new Date(this.startDate)
            copyDate.setMonth(copyDate.getMonth() + this.duration)
            return copyDate
            // console.log(endDate,' chequeado')

        } else return null
    }

    hasFeature(featureName) {
        if (typeof featureName !== 'stirng') throw new Error("Feature name must be a string");

        const validation = this.features.find(fea => fea === featureName)
        if (validation === undefined) return false
        else return true

    }

    calculateTotalCost() {
        return parseFloat((this.price * this.duration).toFixed(2))
    }
}

/**
 * Representa un suscriptor del servicio.
 * Traducción: Suscriptor
 * @class
 */
class Subscriber {
    constructor(subscriberId, name, email) {
        if (subscriberId.trim() === '' || typeof subscriberId !== 'string') throw new Error("Subscriber ID is required");
        if (name.trim() === '' || typeof name !== 'string') throw new Error("Subscriber name is required");
        if (email.trim() === '' || typeof email !== 'string') throw new Error("Subscriber email is required");

        this.subscription = null
        this.paymentHistory = []
        this.subscriberId = subscriberId
        this.name = name
        this.email = email

    }

    subscribe(subscription) {
        if (!(subscription instanceof Subscription)) throw new Error("Subscription must be an instance of Subscription");

        subscription.startDate = new Date()
        subscription.startDate.setMonth(subscription.startDate.getMonth() - 1)
        this.subscription = subscription
        return true
    }

    renew(months) {
        let sub
        if (this.subscription !== null) {
            sub = this.subscription.isActive()
        }
        console.log(sub, 'sub')
        if (months <= 0) throw new Error("Months must be greater than 0");
        if (!(sub)) throw new Error("No active subscription to renew");


        const newDate = new Date(this.subscription.startDate.setMonth(this.subscription.startDate.getMonth() + months))
        this.subscription.startDate = newDate
        return newDate


    }

    cancel() {

        if (this.subscription === null) throw new Error("No active subscription to cancel");
        this.subscription = null
        return true

    }

    addPayment(amount, date) {
        if (amount <= 0) throw new Error("Payment amount must be greater than 0");
        if (!(date instanceof Date)) throw new Error("Payment date must be a Date object");

        this.paymentHistory.push({
            amount: amount,
            date: date
        })
        return this.paymentHistory.length
    }

    getTotalPaid() {
        return this.paymentHistory.reduce((acumulador, pay) => {
            return acumulador + (pay.amount)
        }, 0)
    }

    getSubscriptionStatus() {
        if (this.subscription === null) return 'none'
        if (this.subscription.isActive()) return 'active'
        else return 'expired'
    }
}

/**
 * Gestiona el servicio de suscripciones.
 * Traducción: Servicio de Suscripciones
 * @class
 */
class SubscriptionService {
    constructor(name) {
        if (name.trim() === '' || typeof name !== 'string') throw new Error("Service name is required");

        this.subscriptions = []
        this.subscribers = []
        this.name = name.trim()

    }

    addSubscriptionPlan(subscription) {
        if (!(subscription instanceof Subscription)) throw new Error("Subscription must be an instance of Subscription");
        if (this.subscriptions.find(sub => sub.planName === subscription.planName) !== undefined) throw new Error("Subscription plan already exists")
        else this.subscriptions.push(subscription)

        return this.subscriptions.length


    }

    registerSubscriber(subscriber) {
        if (!(subscriber instanceof Subscriber)) throw new Error("Subscriber must be an instance of Subscriber");
        if (this.subscribers.find(sub => sub.name === subscriber.name || sub.subscriberId === subscriber.subscriberId) !== undefined) throw new Error("Subscriber ID already exists");
        else this.subscribers.push(subscriber)

        return this.subscribers.length


    }

    getActiveSubscribers() {
        return this.subscribers.filter(sub => sub.subscription !== null)
    }

    getSubscribersByPlan(planName) {
        if (typeof planName !== 'string') throw new Error("Plan name must be a string");

        return this.subscribers.filter(sub => {
            if (sub.subscription !== null) {
                return sub.subscription.planName === planName
            }
        })

    }

    getRevenue() {
        return this.subscribers.reduce((acumulador, sub) => {
            return acumulador + ((sub.getTotalPaid()))
        }, 0)
    }

    getChurnRate() {
        return this.subscribers.filter(sub => {
            return sub.getSubscriptionStatus() === 'none'
            // console.log(sub.getSubscriptionStatus())
        }).length

    }

    getMostPopularPlan() {
        const acumulador = this.subscribers.reduce((acumulador = {}, sub) => {
            if (sub.subscription !== null) {
                const planeName = sub.subscription.planName
                // console.log(planeName)
                // console.log()
                if (acumulador[planeName]) {
                    acumulador[planeName] = (acumulador[planeName] || 0) + 1
                } else acumulador[planeName] = 1
                return acumulador
            }
        }, {})

        const valueMax = Math.max(...Object.values(acumulador))
        let namePlane

        for (const key in acumulador) {
            if (acumulador[key] === valueMax) {
                namePlane = this.subscriptions.find(sub => {
                    return sub.planName === key
                    console.log(key === sub.planName, 'key')
                })
            }


        }
        return namePlane

    }
}



// const bronce = new Subscription('bronce', 55, 2)
// const plata = new Subscription('plata', 85, 5)
// const oro = new Subscription('oro', 110, 10)
// console.log(bronce.isActive())
// console.log(bronce.getExpiryDate(), ' chequeo')
// console.log(bronce.calculateTotalCost())
// console.log(bronce)

// const sub1 = new Subscriber('12548', 'Armando', 'Armandoalbb@gmail.com')
// const sub2 = new Subscriber('12', 'Samuel', 'as@gmail.com')
// const sub3 = new Subscriber('595', 'otilio', 'asdaasdsdas@gmail.com')
// const sub4 = new Subscriber('846952', 'Noah', 'dssa@gmail.com')
// console.log(sub1.subscribe(bronce))
// console.log(sub2.subscribe(plata))
// console.log(sub3.subscribe(plata))
// console.log(sub4.subscribe(oro))
// console.log(sub1)
// console.log(sub1.renew(5))
// console.log(sub1.subscribe(bronce))
// console.log(sub1.cancel())
// console.log(sub1.addPayment(55, new Date()))
// console.log(sub1.addPayment(55, new Date()))
// console.log(sub1.addPayment(55, new Date()))
// console.log(sub2.addPayment(55, new Date()))
// console.log(sub2.addPayment(55, new Date()))
// console.log(sub1.getTotalPaid())
// console.log(sub1.getSubscriptionStatus())
// console.log(sub1)


// const cafeteria = new SubscriptionService('cafeteria por subs')
// console.log(cafeteria.addSubscriptionPlan(bronce))
// console.log(cafeteria.addSubscriptionPlan(plata))
// console.log(cafeteria.addSubscriptionPlan(oro))
// console.log(cafeteria.registerSubscriber(sub1))
// console.log(cafeteria.registerSubscriber(sub2))
// console.log(cafeteria.registerSubscriber(sub3))
// console.log(cafeteria.registerSubscriber(sub4))
// console.log(cafeteria.getActiveSubscribers())
// console.log(cafeteria.getSubscribersByPlan('bronce'))
// console.log(cafeteria.getRevenue())
// console.log(cafeteria.getChurnRate())
// console.log('/////////////////////////////')
// console.log(cafeteria.getMostPopularPlan())
// console.log('/////////////////////////////')
// console.log(JSON.stringify(cafeteria, null, 2))

const service = new SubscriptionService('MyService');
const subscriber = new Subscriber('S001', 'Juan', 'juan@email.com');
service.registerSubscriber(subscriber);
// service.registerSubscriber(subscriber);
// service.registerSubscriber(new Subscriber('S001', 'Pedro', 'pedro@email.com'))
console.log(service)

module.exports = {
    Subscription,
    Subscriber,
    SubscriptionService
};

