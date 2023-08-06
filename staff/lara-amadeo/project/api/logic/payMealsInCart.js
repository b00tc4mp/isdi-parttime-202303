const { User, Order } = require('../data/models')
const { errors: { ExistanceError } } = require('../../com')
import { generateSerialNumbers } from '../helpers'

module.exports = function payMealsinCart(userId) {
    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistanceError(`User with id ${userId} not found`)

        const serial = generateSerialNumbers()

        const payedMeal = new Order({
            items: user.cart,
            serial
        })

        user.order.push(payedMeal)
        user.cart.length = 0

        await user.save()
    })()
}