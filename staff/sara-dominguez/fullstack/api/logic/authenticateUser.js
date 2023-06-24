const context = require('./context')
const { validators: { validateEmail, validatePassword } } = require('com')

module.exports = function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    const { users } = context

    return users.findOne({ email })
        .then(user => {
            if (!user) throw new Error('user not found')

            if (user.password !== password) throw new Error('error credentials')

            return user._id.toString()//lo convierto a string para evitar poner a la vista datos internos de mongo
        })


    // Antes con callbacks
    // readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
    //     if (error) {
    //         callback(error)

    //         return
    //     }

    //     const users = JSON.parse(json)

    //     const user = users.find(user => user.email === email)

    //     if (!user) {
    //         callback(new Error(`user with email ${email} not found`))

    //         return
    //     }

    //     if (user.password !== password) {
    //         callback(new Error('wrong credentials'))

    //         return
    //     }

    //     callback(null, user.id)
    // })
}