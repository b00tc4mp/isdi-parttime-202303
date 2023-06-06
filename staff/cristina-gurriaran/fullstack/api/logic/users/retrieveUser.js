const { readFile } = require('fs')
const { validators: { validateId, validateCallback } } = require('com')

module.exports = function retrieveUser(userId, callback){
    validateId (userId, 'user id')
    validateCallback(callback)

    readFile('./data/users.json', 'utf8', (error, json) => {
        if(error){
            callback(error)
            return
        }

        const users = JSON.parse(json)
        let user = users.find(user => user.id === userId)
        
        if(!user){
            callback(error)
            return
        }

        user = {
            name: user.name,
            avatar: user.avatar,
            favs: user.favs
        }

        callback(null, user)

    })
}
