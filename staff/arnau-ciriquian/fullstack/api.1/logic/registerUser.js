const { readFile, writeFile } = require('fs')

module.exports = function registerUser(name, email, password, callback) {
    //validators

    readFile('./data/users.json', 'utf-8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        let user = users.find(user => user.email === email)

        if (user) {
            callback(new Error(`user with email ${email} already exists`))

            return
        }

        let id = 'user-1'

        const lastUser = users[users.length -1]

        if (lastUser)
            id = `user-${parseInt(lastUser.id.slice(5)) + 1}`
        
        user = { 
            id,
            name,
            email,
            password,
            avatar: null,
            favs: []
        }

        users.push(user)

        json = JSON. stringify(users)

        writeFile('./data/users.json', json, 'utf-8', error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    })
}