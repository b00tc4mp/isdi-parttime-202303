const { validators: { validateId } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')


module.exports = userId => {
    validateId(userId, 'user Id')

    const { users } = context
    // bring id striing using ObjectId
    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error('user not found')
            //sanitize/clear the unwanted data in the object by crating object:

            // const {name , email}=user
            // return {
            //     name,
            //     email
            // }

            //or deleting:
            delete user._id
            delete user.password

            return user
        })
}