const context = require('./context')
const { validators: { validateEmail, validatePassword } } = require('com')

module.exports = (email, password,) => {
    validateEmail(email)
    validatePassword(password)

    const { users } = context

    return users.findOne({ email })
        .then(user => {
            if (!user) throw new Error('user not found')

            if (user.password !== password) throw new Error('password mismatch')

            //only return the hash of the _id
            // "_id": {
            // "$oid": "6494082b7b80b0e1d774bb87"
            //   },
            return user._id.toString()
        })
}