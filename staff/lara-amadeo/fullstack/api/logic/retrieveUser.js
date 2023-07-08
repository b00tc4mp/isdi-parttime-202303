const { errors: { ExistanceError } } = require('com')
const { ObjectId } = require('mongodb')
const { User } = require('../data/models')

module.exports = function retrieveUser(userId) {
    return User.findById(userId)
        .then(foundUser => {
            if (!foundUser) {
                throw new ExistanceError(`User with id ${userId} not found`)
            }
            const { username, email, avatar } = foundUser

            const user = { username, email, avatar }

            return user
        })
}