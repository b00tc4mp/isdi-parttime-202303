const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { User, Mission, Character } = require('../data/models')

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

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            return Character.findById(user.character)
                .then(character => {
                    if (!character) throw new ExistenceError('character not found')

                    return Mission.find().sort({ completed: 1, level: 1, date: -1 }).lean()
                        .then(missions => {
                            missions.forEach(mission => {
                                mission.id = mission._id.toString()

                                mission.completed = character.missions.some(miss => miss.toString() === mission.id)

                                delete mission._id
                                delete mission.__v
                            })

                            return missions
                        })
                })
        })
}