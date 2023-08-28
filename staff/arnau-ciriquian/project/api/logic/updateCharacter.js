const {
    validators: { validateUrl, validateId },
    errors: { ExistenceError }
} = require('com')
const { User, Character } = require('../data/models')

/**
 * Updates user avatar
 * 
 * @param {string} userId User id
 * @param {string} avatar New avatar url
 * 
 * @returns 
 * 
 * @throws {TypeError} On non-string user id or avatar url
 * @throws {ContentError} On empty avatar url
 * @throws {ExistenceError} On non-existing user
 */
module.exports = (userId, newCharacterName, newAvatar) => {
    validateId(userId)
    //validateUrl(avatar, 'avatar url')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            return Character.updateOne({ '_id': user.character }, { characterName: newCharacterName, avatar: newAvatar })
        })
}