const { readFile, writeFile } = require('fs')

module.exports = function registerUser(username, email, password, callback){

    readFile('./data/users.json', 'utf8', (error, json) => {
        if(error){
            callback(error)
            return
        }

        const users = JSON.parse(json)

        let user = users.find(user => user.email === email)

        if(user){
            callback(new Error(`User with email ${email} already exists`))

            return
        }

        let id = 'user-1'
        const lastUser = users[users.length - 1]
    
        if (lastUser)
            id = `user-${(Number(lastUser.id.slice(5)) + 1)}`

        user = {
            id,
            username,
            email,
            password,
            avatar: null,
            likedPosts:[]
        }

        users.push(user)

        const _json = JSON.stringify(users)

        writeFile('.data/users.json', _json, 'utf8', error => {
            if(error){
                callback(error)
                return
            }
            console.log('user registered!')

            callback(null)
        })
    })
}