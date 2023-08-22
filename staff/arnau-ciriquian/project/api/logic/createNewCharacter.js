const { User, Character } = require('../data/models')
const {
    validators: { validateId, validateName, validateUrl },
    errors: { ExistenceError }
} = require('com')

/**
 * Registers a new user
 * 
 * @param {string} name New user name
 * @param {string} avatar New User avatar
 *  
 * @returns
 * 
 * @throws {TypeError} On non-string name or avatar
 * @throws {ContentError} On empty name or avatar
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