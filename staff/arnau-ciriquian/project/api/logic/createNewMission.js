const {
    validators: { validateId, validateUrl, validateText },
    errors: { ExistenceError }
} = require('com')
const { User, Mission } = require('../data/models')

/**
 * Creates a new mission
 * 
 * @param {string} userId User id
 * @param {string} missionId Mission id
 * @param {string} image New mission image
 * @param {string} tittle New mission tittle
 * @param {string} info New mission info
 * @param {string} level New mission level
 * @param {string} difficulty New mission difficulty
 * @param {boolean} visibility New mission visibility 
 * 
 * @returns 
 * 
 * @throws {TypeError} On non-string user id, mission id, mission image, mission tittle, mission info, mission level, mission difficulty or mission visibility
 * @throws {ContentError} On empty user id, mission id, mission image, mission tittle, mission info, mission level, mission difficulty or mission visibility
 * @throws {ExistenceError} On non-existing user or mission
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