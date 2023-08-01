const { errors: { ExistanceError, AuthError } } = require('../../com')
const { validateText } = require('../../com/validators')
const { User, Meal } = require('../data/models')

module.exports = function createMeal(userId, images, title, description, categories, ingredients, bestBefore, price) {
    validateText(description)
    validateText(title)

    return (async () => {
        let user
        try {
            user = await User.findById(userId)
            await Meal.create({
                author: userId,
                images,
                title,
                description,
                categories,
                ingredients,
                bestBefore,
                price
            })
        } catch (error) {
            if (!user) throw new ExistanceError(`User with id ${userId} not found`)
        }
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