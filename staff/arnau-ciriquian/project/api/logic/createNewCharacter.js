const { Character } = require('../data/models')
const {
    validators: { validateName, validateUrl },
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
module.exports = (characterName, avatar) => {
    validateName(characterName)
    validateUrl(avatar)

    const created = new Date
    const level = 1

    return Character.create({ characterName, avatar, created, level })
        .catch(error => {
            throw error
        })
}