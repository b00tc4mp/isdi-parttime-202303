const { readFile, writeFile, read } = require("fs")
const { validateCallback, validatePassword } = require("./helpers/validators")
const { error } = require("console")

module.exports = function updatePassword(userId, password, newPassword, callback){
    validatePassword(newPassword)
    validateCallback(callback)

    readFile("./data/users.json", "utf-8", (error, json) => {
        if(error){
            callback(error)
            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)
        
        if(!user){
            callback(new Error(`User with id ${userId} not found`))
            return
        }

        if(password !== user.password){
            callback(new Error(`Invalid current password`))

            return
        }

        if(password === newPassword){
            callback(new Error(`Current password cannot be the same as new password`))

            return
        }

        user.password = newPassword

        json = JSON.stringify(users)

        writeFile("./data/users.json", json, error => {
            if(error){
                callback(error)

                return
            }

            callback(null)
        })
    })
}