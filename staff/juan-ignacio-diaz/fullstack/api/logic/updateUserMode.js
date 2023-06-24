const { validators: { validateId } } = require('com')

const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports = (userId, mode) => {
    validateId(userId, 'user id')

    const { users } = context

    return users.updateOne({ _id: new ObjectId(userId) }, { $set: { mode: mode }})
}