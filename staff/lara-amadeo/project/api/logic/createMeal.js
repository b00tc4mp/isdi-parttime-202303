const { errors: { ExistanceError, AuthError } } = require('../../com')
const { validateText } = require('../../com/validators')
const { User, Meal } = require('../data/models')

module.exports = function createMeal(userId, images, title, description, ingredients, categories, bestBefore, quantity, price) {
    validateText(description)
    validateText(title)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistanceError(`User with id ${userId} not found`)

        await Meal.create({
            author: userId,
            images,
            title,
            description,
            ingredients,
            categories,
            quantity,
            bestBefore,
            price
        })
    })()
}

/*
return User.findById(userId)
.then(user => {
    if (!user) throw new ExistanceError(`User with id ${userId} not found`)

    return Meal.create({
        author: userId,
        images,
        title,
        description,
        categories,
        ingredients,
        bestBefore,
        price
    })
})
*/