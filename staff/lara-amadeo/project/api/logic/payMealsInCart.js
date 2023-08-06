const { Meal, User, Order, ChefOrder } = require('../data/models')
const { errors: { ExistanceError } } = require('../../com')
const { generateSerialNumbers } = require('../helpers')

module.exports = function payMealsinCart(userId) {
    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistanceError(`User with id ${userId} not found`)

        const serial = generateSerialNumbers()

        const mealsMap = new Map()

        const payedMeal = new Order({
            items: user.cart,
            serial
        })
        debugger

        for (const cartItem of user.cart) {
            const meal = await Meal.findById(cartItem.meal)

            if (mealsMap.has(meal.author)) {
                mealsMap.get(meal.author).push({ meal: meal._id, quantity: cartItem.quantity, author: meal.author })
            } else {
                mealsMap.set(meal.author, [{ meal: meal._id, quantity: cartItem.quantity, author: meal.author }]
                )
            }
        }

        const mealsInProcess = Array.from(mealsMap.values())

        for (const meal of mealsInProcess) {
            const chef = await User.findById(meal[0].author)
            const _meal = new ChefOrder(meal[0])
            chef.pendingOrder.push(_meal)
            await chef.save()
        }

        user.order.push(payedMeal)
        user.cart = []

        await user.save()
    })()
}


/*
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
*/