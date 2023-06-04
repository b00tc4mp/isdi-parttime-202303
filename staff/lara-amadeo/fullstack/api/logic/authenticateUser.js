const { readFile } = require('fs')

module.exports = function authenticateUser(email, password, callback){

    readFile('./data/users.json', 'utf8', (error, json) => {
        if(error){
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.email === email)

        if(!user){
            callback(new Error(`User with email ${email} not found`))

            return
        }

        if(user.password !== password){
            callback(new Error(`Email or password incorrect`))

            return
        }
        callback(null, user.id)
    })
}