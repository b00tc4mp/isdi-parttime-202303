const { validators: { validateId } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = userId => {
    validateId(userId, 'user id')

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error('user not found')

            // sanitize

            // const { name, email } = user

            // return {
            //     name,
            //     email
            // }

            delete user._id
            delete user.password

            return user
        })
}