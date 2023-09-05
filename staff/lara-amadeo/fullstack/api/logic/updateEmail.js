const { validators: { validateEmail } } = require('com')
const { User } = require('../data/models')


module.exports = function updateEmail(userId, email, newEmail) {
    validateEmail(email)
    validateEmail(newEmail)

    return User.findById(userId)
        .then(user => {
            if (user.email !== email) throw new TypeError('Current email incorrect')

            return User.updateOne({ _id: userId }, { email: newEmail })
        })

}