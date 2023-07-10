const { ObjectId } = require('mongodb')
const context = require('../context')
const { validators: { validateUserId, validateEmail } } = require('com')

module.exports = (userId, newEmail) => {
    validateUserId(userId)
    validateEmail(newEmail)

    const { users } = context
    const _user = { _id: new ObjectId(userId) }

    return users.findOne(_user)
        .then(user => {
            if (!user) throw new Error('user not found')
            return users.updateOne(_user, { $set: { email: newEmail } })
        })
}