const { User } = require('../../data/models')

const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

/**
 * 
 * @param {string} userId 
 * @param {string} image 
 * @returns {Promise<Object>} returns a promise object contains de user with the user image updated 
 * 
 * @throws {TypeError} on non-string id and image (sync)
 * @throws {ContentError} on empty id or image (sync)
 * @throws {FormatError} wrong format on image (sync)
 * 
 * @throws {AuthError} on failed correlation on db and provided data in order to authorize this action (async)
 * @throws {ExistenceError} on user not found (async)

 */
module.exports = (userId, image) => {
    validateId(userId)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError('user not found')
            debugger
            return user.updateOne({ image: image })
        })
}