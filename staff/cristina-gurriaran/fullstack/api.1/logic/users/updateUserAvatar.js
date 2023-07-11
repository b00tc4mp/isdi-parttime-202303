require('dotenv').config()
const { readFile, writeFile } = require('fs')
const { validators: { validateId, validateUrl, validateCallback } } = require('com')

module.exports = function updateUserAvatar(userId, avatar, callback){
    validateId(userId, 'user id')
    validateUrl(avatar, 'avatar url')
    validateCallback(callback)

    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
        if(error){
            callback(error)
            return
        }

        const users = JSON.parse(json)
        const user = users.find(user => userId === user.id)

        if(!user){
            callback(new Error('user not found'))
            return
        }

        user.avatar = avatar

        const json2 = JSON.stringify(users, null, 4)

        writeFile(`${process.env.DB_PATH}/users.json`, json2, 'utf8', error => {
            if(error){
                callback(error)
                return
            }
            callback(null)
        })
    })
}