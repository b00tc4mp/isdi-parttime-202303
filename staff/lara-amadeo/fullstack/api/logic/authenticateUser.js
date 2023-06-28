const context = require('./context')

module.exports = function authenticateUser(email, password) {

    const { users } = context
    return users.findOne({ email })
        .then(user => {
            if (!user) throw new Error(`User with email ${email} not found`)

            if (user.password !== password) throw new Error(`Email or password incorrect`)

            return user._id.toString()
        })
}
