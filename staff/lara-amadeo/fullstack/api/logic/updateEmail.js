const { validators: { validateEmail, validateCallback } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')


module.exports = function updateEmail(userId, email, newEmail) {
    validateEmail(email)
    validateEmail(newEmail)

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId)})
        .then(user => {
            if(user.email !== email) throw new Error('Current email incorrect')
            
            return users.updateOne({ _id: new ObjectId(userId)}, {$set:{email: newEmail}})
        })

}