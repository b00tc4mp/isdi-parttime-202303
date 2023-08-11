const { User, Meal } = require('../data/models')
const { errors: { ExistanceError, AuthError } } = require('../../com')

module.exports = async function retrieveMeals(mealId) {

    // const user = await User.findById(userId)

    // if (!user) throw new ExistanceError(`User with id ${userId} not found`)

    const meal = await Meal.findById(mealId).populate('author', '-password -likedChefs -__v -email').lean()

    meal.id = meal._id.toString()

    delete meal._id

    if (meal.author._id) {
        meal.author.id = meal.author._id.toString()
        delete meal.author._id
    }
    return meal

}

/* return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistanceError(`User with id ${userId} not found`)

            return Meal.findById(mealId).populate('author', '-password -likedChefs -__v -email').lean()
                .then(meal => {
                    meal.id = meal._id.toString()

                    delete meal._id

                    if (meal.author._id) {
                        meal.author.id = meal.author._id.toString()
                        delete meal.author._id
                    }
                    return meal
                })

        })*/