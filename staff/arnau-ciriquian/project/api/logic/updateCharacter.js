const {
    validators: { validateExpoUrl, validateId },
    errors: { ExistenceError }
} = require('com')
const { User, Character } = require('../data/models')
const { validateText } = require('com/validators')

/**
 * Updates user character
 * 
 * @param {string} userId User id
 * @param {string} newCharacterName New character name
 * @param {string} newAvatar New avatar url
 * 
 * @returns 
 * 
 * @throws {TypeError} On non-string user id, character name or avatar url
 * @throws {ContentError} On empty character name or avatar url
 * @throws {ExistenceError} On non-existing user
 */
module.exports = (userId, newCharacterName, newAvatar) => {
    validateId(userId)
    validateText(newCharacterName, 'character name text')
    //validateExpoUrl(newAvatar, 'avatar url')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            return Character.updateOne({ '_id': user.character }, { characterName: newCharacterName, avatar: newAvatar })
        })
}