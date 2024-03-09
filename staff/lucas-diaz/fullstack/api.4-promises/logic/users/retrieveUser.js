require("dotenv").config()
const {
    validators: { validateId },
    errors: { ExistenceError }
} = require("com")
const { User } = require("../../data/models")


/**
 * 
 * @param {string} userId the user's id
 * @returns {Promise<Object>} returns an object called user
 * 
 * @throws {ContentError } On empty id (sync)
 * @throws {TypeError} On non-string id (sync)
 * 
 * @throws {ExistenceError} On user not found (async)
 */

module.exports = function retrieveUser(userId) {
    validateId(userId)

    return User.findById(userId).lean()
        .then(user => {

            if (!user) throw new ExistenceError("user not found")

            //sanitaze
            delete user._id
            delete user.password
            delete user.email


            return user
        })
}