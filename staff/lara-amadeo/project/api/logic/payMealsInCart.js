const { User, Order } = require('../data/models')
const { errors: { ExistanceError } } = require('../../com')
const { generateSerialNumbers } = require('../helpers')

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
        user.cart = []

        await user.save()
    })()
}