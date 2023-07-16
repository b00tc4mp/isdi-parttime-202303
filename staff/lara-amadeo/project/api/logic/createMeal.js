const { errors: { ExistanceError, AuthError } } = require('../../com')
const { User, Meal } = require('../data/models')

module.exports = function createMeal(userId, images, title, description, categories, ingredients, bestBefore, price) {

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

}