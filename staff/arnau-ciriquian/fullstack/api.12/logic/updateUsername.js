const context = require('./context')
const { ObjectId } = require('mongodb')
const { validators: { validateId, validateName, validatePassword } } = require('com')

module.exports = (userId, oldUsername, newUsername, password) => {
    validateId(userId)
    validateName(oldUsername, 'old username')
    validateName(newUsername, 'new username')
    validatePassword(password)

    if (newUsername === oldUsername) throw new Error('new username is equal to old username')

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error('user not found')

        if (oldUsername !== user.name) throw new Error('old username is not correct')

        if (password !== user.password) throw new Error('password is not correct')

        return users.updateOne({ '_id': new ObjectId(userId) }, { $set: { name: newUsername } })
        })
}