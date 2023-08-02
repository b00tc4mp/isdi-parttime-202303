const {
    validators: { validateId, validateUrl, validateText },
    errors: { ExistenceError }
} = require('com')
const { User, Mission } = require('../data/models')

// EDITAR DOCUMENTACIO

/**
 * Creates a new post by the logged user
 * 
 * @param {string} userId 
 * @param {string} image 
 * @param {string} text 
 * 
 * @returns 
 * 
 * @throws {TypeError} On non-string image or text
 * @throws {ContentError} On empty image or text
 * @throws {ExistenceError} On non-existing user
 */
module.exports = (userId, image, tittle, info, level, difficulty, visibility) => {
    validateId(userId)
    validateUrl(image)
    validateText(tittle)
    validateText(info)
    //validateNumber(level)
    //validateNumber(difficulty)
    //validateBoolean(visibility)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError(`user not found`)

            return Mission.create({
                image,
                tittle,
                info,
                level,
                difficulty,
                visibility,
                survivors: []
            })
        })
}