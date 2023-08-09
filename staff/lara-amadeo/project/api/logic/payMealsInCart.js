const { Meal, User, Order, ChefOrder } = require('../data/models')
const { errors: { ExistanceError } } = require('../../com')
const { generateSerialNumbers } = require('../helpers')
const { Types: { ObjectId } } = require('mongoose')

module.exports = function payMealsinCart(userId) {
    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistanceError(`User with id ${userId} not found`)
        debugger
        const buyerUserId = new ObjectId(userId)
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
                mealsMap.get(meal.author).push({ meal: meal._id, quantity: cartItem.quantity, author: meal.author, buyer: buyerUserId, serial })
            } else {
                mealsMap.set(meal.author, [{ meal: meal._id, quantity: cartItem.quantity, author: meal.author, buyer: buyerUserId, serial }]
                )
            }
        }

        const mealsInProcess = Array.from(mealsMap.values())

        for (const meal of mealsInProcess) {
            const chef = await User.findById(meal[0].author)
            const _meal = new ChefOrder(meal[0])
            chef.selledMeals.push(_meal)
            await chef.save()
        }

        user.order.push(payedMeal)
        user.cart = []

        await user.save()
    })()
}