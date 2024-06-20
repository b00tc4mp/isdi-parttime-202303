const { readFile, writeFile } = require('fs')

//preguntar si el manejo del error de que el precio actual y el nuevo no sean iguales lo tiene que hacer 
module.exports = function sellPost(userId, postId, newPrice, callback) {
    readFile(`${process.env.DB_PATH}/users.json`, 'utf-8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`User with id ${userId} not found`))
            return
        }

        readFile('./data/posts.json', (error, json) => {
            if (error) {
                callback(error)

                return
            }

            posts = JSON.parse(json)

            post = posts.find(post => post.id === postId)

            post.price = newPrice

            json = JSON.stringify(posts)

            writeFile('./data/posts.json', json, 'utf-8', error => {
                if (error) {
                    callback(error)

                    return
                }

                callback(null)
            })
        })
    })
}