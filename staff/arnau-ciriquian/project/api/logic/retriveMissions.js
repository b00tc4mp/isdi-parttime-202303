const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { User, Mission } = require('../data/models')

/**
 * 
 * @param {*} userId User id
 * 
 * @returns An array of all missions in the db
 * 
 * @throws {TypeError} On non-string user id
 * @throws {ContentError} On empty user id
 * @throws {ExistenceError} On non-existing user
 */

module.exports = userId => {
    validateId(userId, 'user id')

    return Promise.all([
        User.findById(userId).lean(),
        Mission.find().sort('-date').lean()
    ])
        .then(([user, missions]) => {
            if (!user) throw new ExistenceError(`user not found`)

            missions.forEach(mission => {
                mission.id = mission._id.toString()
                delete mission._id
                delete mission.__v
            })

            return missions
        })
}