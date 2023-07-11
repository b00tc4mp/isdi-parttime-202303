const { errors: { ExistanceError } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = function retrieveUser(userId) {

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(foundUser => {
            if (!foundUser) {
                throw new ExistanceError(`User with id ${userId} not found`)
            }
            const { username, email, avatar } = foundUser

            const user = { username, email, avatar }

            return user
        })
}