const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { User, Mission } = require('../data/models')

/**
 * Retrieves a single post
 * 
 * @param {string} userId User id
 * @param {string} missionId Mission id
 * 
 * @returns Post info corresponding to post id
 * 
 * @throws {TypeError} On non-string user id or post id
 * @throws {ExistenceError} On non-existing user or post
 */
module.exports = (userId, missionId) => {
    validateId(userId, 'user id')
    validateId(missionId, 'mission id')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            return Mission.findById(missionId)
                .then(mission => {
                    if (!mission) throw new ExistenceError('mission not found')

                    return mission
                })
        })
}
