const { ObjectId } = require('mongodb')
const context = require('../context')
const { validators: { validateUserId, validateText } } = require('com')

module.exports = (userId, newName) => {
    validateUserId(userId)
    validateText(newName)

    const { users } = context
    const _user = { _id: new ObjectId(userId) }

    return users.findOne(_user)
        .then(user => {
            if (!user) throw new Error('user not found')

            return users.updateOne(_user, { $set: { name: newName } })
        })

}