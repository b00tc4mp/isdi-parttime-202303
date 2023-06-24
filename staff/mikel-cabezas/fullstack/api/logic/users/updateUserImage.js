const { ObjectId } = require('mongodb')
const context = require('../context')
const { validators: { validateUserId } } = require('com')

module.exports = (userId, avatar) => {
    validateUserId(userId)

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return users.updateOne({ _id: new ObjectId(userId) }, { $set: { image: avatar } })
        })
}