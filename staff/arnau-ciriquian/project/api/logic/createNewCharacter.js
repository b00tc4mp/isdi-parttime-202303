const { User, Character } = require('../data/models')
const {
    validators: { validateId, validateName, validateUrl },
    errors: { ExistenceError }
} = require('com')

/**
 * Creates a new character for a user
 * 
 * @param {string} userId User id
 * @param {string} name New character name
 * @param {string} avatar New character avatar
 *  
 * @returns
 * 
 * @throws {TypeError} On non-string user id, name or avatar
 * @throws {ContentError} On empty user id, name or avatar
 * @throws {ExistenceError} On non-existing user
 */
module.exports = (userId, characterName, avatar) => {
    validateId(userId)
    validateName(characterName)
    //validateUrl(avatar)

    const created = new Date
    const level = 1

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError('user not found')
            return Character.create({ characterName, avatar, created, level })
                .then(character => User.updateOne({ '_id': userId }, { character: character._id }))
                .catch(error => {
                    throw error
                })
        })
}