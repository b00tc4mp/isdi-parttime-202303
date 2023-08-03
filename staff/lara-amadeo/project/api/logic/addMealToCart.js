const { User, Meal } = require('../data/models')
const { errors: { ExistanceError, AuthError } } = require('../../com')

module.exports = function addMealToCart(userId, mealId, mealAmount) {
    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new ExistanceError(`User with id ${userId} not found`)

        const meal = await Meal.findById(mealId)
        if (!meal) throw new ExistanceError(`Meal with id ${mealId} not found`)

        const mealInUserCart = {
            id: mealId,
            status: "cart",
            amount: mealAmount
        }
        user.meals.push(mealInUserCart)

        await user.save()
    })()
}