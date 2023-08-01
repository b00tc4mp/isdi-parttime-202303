const { User, Meal } = require('../data/models')
const { errors: { ExistanceError, AuthError } } = require('../../com')


module.exports = function updateMeal(userId, mealId, images, title, description, categories, ingredients, bestBefore, price) {

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new ExistanceError(`User with id ${userId} not found`)

        const meal = await Meal.findById(mealId)
        if (!meal) throw new ExistanceError(`Meal with id ${mealId} not found`)
        debugger

        if (meal.author.toString() !== userId) throw new AuthError(`Meal with id ${mealId} and author id ${meal.author}does not belong to user with id ${userId}`)

        await Meal.updateOne({ _id: mealId }, {
            images,
            title,
            description,
            categories,
            ingredients,
            bestBefore,
            price
        })
    })()




}