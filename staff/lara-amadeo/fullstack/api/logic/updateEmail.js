const { readFile, writeFile } = require("fs")
const { validateEmail, validateCallback } = require('./helpers/validators')


module.exports = function updateEmail(userId, email, newEmail, callback){
    validateEmail(email)
    validateEmail(newEmail)
    validateCallback(callback)

    //move this error to FE
    if (email === newEmail){
        callback(new Error('New email cannot be the same as current email'))
        
        return
    }

    readFile("./data/users.json", (error, json) => {
        if(error){
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        user.email = newEmail

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