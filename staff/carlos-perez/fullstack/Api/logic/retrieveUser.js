const { readFile } = require('fs')

module.exports = function retrieveUser(userId, callback){
    readFile('../data/users.json', 'utf8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        const _user={
            name: user.name,
            id: user.id
        }


        callback(null, _user)
    })
}