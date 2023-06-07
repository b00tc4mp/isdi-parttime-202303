const { readFile, writeFile } = require('fs')

module.exports = function updateUserCity(userId, city, callback) {
    //TODO validate inputs

    readFile('./data/users.json', 'utf8', (error, json) => {
        if(error){
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        if(!user) {
            callback(new Error(`user with user-id ${userId} not found`))

            return
        }

        user.city = city

        json = JSON.stringify(users)

        writeFile('./data/users.json', json, error => {
            if(error){
                callback(error)

                return
            }

            callback(null)
        })
    })
}