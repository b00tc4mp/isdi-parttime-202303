const { User } = require('../data/models')
const { errors: { ExistanceError, AuthError } } = require('../../com')

/**
 * Returns a meal
 * @param {string} meal meal's id
 * @returns {object} the founded meal
 */
module.exports = async function retrieveMeal(userId) {
    debugger
    const user = await User.findById(userId).populate('likedChefs', '-password -likedChefs -order -selledMeals -__v -cart').lean()
    if (!user) throw new ExistanceError(`User with id ${userId} not found`)

    return user.likedChefs
}