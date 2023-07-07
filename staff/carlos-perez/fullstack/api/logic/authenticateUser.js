const { validators: { validateEmail, validatePassword, validateCallback } } = require('com')
const context = require('./context')

module.exports = (email, password, callback) => {
    validateEmail(email)
    validatePassword(password)
    validateCallback(callback)

    const { users } = context

    return users.findOne({ email })
        .then(user => {
            if (!user){
                callback(new Error('user not found'))
                return
            }

            if (user.password !== password)
            {
                callback(new Error('wrong credentials'))
                return
            }

            callback(null, user._id.toString())
        })
}