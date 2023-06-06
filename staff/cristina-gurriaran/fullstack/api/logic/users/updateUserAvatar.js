const { readFile, writeFile } = require('fs')
const { validators: { validateId, validateUrl, validateCallback } } = require('com')

module.exports = function updateUserAvatar(userId, avatar, callback){
    validateId(userId, 'user id')
    validateUrl(avatar, 'avatar url')
    validateCallback(callback)

    readFile('./data/users.json', 'utf8', (error, json) => {
        if(error){
            callback(error)
            return
        }

        const users = JSON.parse(json)
        let user = users.find(user => userId === user.id)

        if(!user){
            callback(error)
            return
        }

        user.avatar = avatar
        users.push(user)

        json = JSON.stringify(users, null, 4)

        writeFile('./data/users.json', json, 'utf8', error => {
            if(error){
                callback(error)
                return
            }
            callback(null)
        })
    })
}