const { validators: { validateUserId } } = require('com')
const { ObjectId } = require('mongodb')
const context = require('../context')

module.exports = userId => {
    validateUserId(userId)

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error('user not found')

            delete user._id
            delete user.password

            return user
        })

}