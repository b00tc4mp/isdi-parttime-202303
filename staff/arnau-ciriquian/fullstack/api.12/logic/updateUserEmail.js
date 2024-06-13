const context = require('./context')
const { ObjectId } = require('mongodb')
const { validators: { validateId, validateEmail } } = require('com')

module.exports = (userId, email, newEmail, newEmailConfirmation, password) => {
    validateId(userId, 'user id')
    validateEmail(newEmail, 'new email')
    //new validator?
    if (newEmail !== newEmailConfirmation) throw new Error('new email confirmation is different than new email')

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error('user not found')

            if (user.email !== email) throw new Error(`email does not correspond to actual email`)

            return users.findOne({ email: newEmail })
                .then(_user => {

                if (_user) throw new Error('new email already registered')
    
                if (user.password !== password) throw new Error(`incorrect password`)

                return users.updateOne({ '_id': new ObjectId(userId) }, { $set: { email: newEmail } })
                })
        })
}