const {
    validators: { validateId },
    errors: { ExistenceError, PropertyError }
} = require('com')
const { User, Mission } = require('../data/models')

/**
 * Deletes the current mission
 * 
 * @param {string} userId User id
 * @param {string} missionId mission id
 * 
 * @returns
 * 
 * @throws {TypeError} On non-string user id or mission id
 * @throws {ContentError} On empty user id, mission id
 * @throws {ExistenceError} On non-existing user or mission
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

                    return Mission.deleteOne({ _id: missionId })
                })
        })
}