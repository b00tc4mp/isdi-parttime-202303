const { User, Playground } = require('../../data/models')

const {
    validators: { validateUserId },
    errors: { ExistenceError }
} = require('com')

/**
 * 
 * @param {string} userId 
 * @returns {Promise<Object>} returns a promise object contains de sanatized playgrounds 
  * 
 * @throws {TypeError} on non-string userId (sync)
 * @throws {ContentError} on empty userId (sync)
 * 
 * @throws {ExistenceError} on user not found (async)
 */
module.exports = userId => {
    validateUserId(userId)

    return Promise.all([
        User.findById(userId).lean(),
        Playground.find().lean(),
    ])
        .then(([user, playground]) => {

            if (!user) new ExistenceError(`User with id ${userId} not found`)

            // playground.forEach(playground => {
            //     playground.id = playground._id.toString()

            //     delete playground._id

            // })
            // console.log(playground)

            return playground
        })
}