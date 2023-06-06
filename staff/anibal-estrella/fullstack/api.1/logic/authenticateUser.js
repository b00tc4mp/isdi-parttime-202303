const { error } = require('console')
const { readFile } = require('fs')

module.exports = function authentucateUser(email, password, callback) {
    readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            callbackify(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.email === email)

        if (!user) {
            callback(new Error(`User with email ${email} not found! 👎`))

            return
        }

        if (user.password !== password) {
        callback(new error('Wrong password 😢'))
    }
    callback(null, user.id)
})

}