const { User, Character, Mission } = require('../data/models')
const {
    validators: { validateId, validateName, validateUrl },
    errors: { ExistenceError }
} = require('com')

/**
 * Registers completed mission id into a character's missions array
 * 
 * @param {string} userId User id
 * @param {string} missionId Mission id
 *  
 * @returns
 * 
 * @throws {TypeError} On non-string user id or mission id
 * @throws {ContentError} On empty user id or mission id
 * @throws {ExistenceError} On non-existing user, non-existing character or non-existing mission
 */
module.exports = (userId, missionId) => {
    validateId(userId)
    validateId(missionId)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError('user not found')
            return Character.findById(user.character)
                .then(character => {
                    if (!character) throw new ExistenceError('character not found')
                    return Mission.findById(missionId)
                        .then(mission => {
                            if (!mission) throw new ExistenceError('mission not found')

                            const updatedMissions = character.missions
                            updatedMissions.push(missionId)

                            return Character.updateOne({ '_id': user.character }, { missions: updatedMissions })
                                .catch(error => {
                                    throw error
                                })
                        })

                })
        })
}