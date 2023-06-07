// bring rweadfile tool from th FS (tool from node.js)
const { readFile, writeFile } = require('fs') //commonJS

const { validators: { validateName, validateEmail, validatePassword, validateCallback } } = require('com')


// create function with the parameters it receives
module.exports = function registerUser(name, email, password, callback) {
validateEmail(email)
validateName(name)
validatePassword(password)
validateCallback(callback)

    //read the users.json, the format of the fils and the error callback
    readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            callback(error)
            return
        }
        //convert the JSON as an object in MEMORY
        const users = JSON.parse(json)

        // look in the array if a user already has that emailñ registered and send the error
        let user = users.find(user => user.email === email)

        /// if ther's an error send the error
        if (user) {
            callback(new Error(`user with email ${email} already exists`))
            // and we finish the process
            return
        }

        let id = 'user-1'

        const lastUser = users[users.length - 1]

        if (lastUser) {
            id = `user-${parseInt(lastUser.id.slice(5)) + 1}`
        }

        // lets save this user in memory so we can later inject it to the array in memory also
        user = {
            id,
            name,
            email,
            password,
            avatar: null,
            favs: []
        }

        // now lets INJECT that new user in the Array with the users objects saved in memory
        users.push(user)
        // mpw let save this file in the HARD DRIVE(BD) 
        // we convert the object back to JSON format 
        // with a 4 identation prettify
        json = JSON.stringify(users, null, 4)
        // async 2nd call to the samefile users.json and we send the error to the callback if thers an error in the saving file process
        writeFile('./data/users.json', json, 'utf8', error => {
            if (error) {
                callback(error)
                return
            }
            //happy path :D
            callback(null)
        })
    })

}