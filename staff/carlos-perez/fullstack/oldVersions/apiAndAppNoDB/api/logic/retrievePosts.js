const { readFile } = require('fs')
const versionDetection = require('../helpers/versionDetection')
const { validators: { validateId, validateCallback } } = require('com')


module.exports = function retrievePosts(userId, callback){
    validateId(userId)
    validateCallback(callback)
    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, filedUsers) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(filedUsers)

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        readFile(`${process.env.DB_PATH}/posts.json`, 'utf8', (error, filedPosts) => {
            if (error) {
                callback(error)
    
                return
            }
            const posts = JSON.parse(filedPosts)

            const version=parseInt(versionDetection());

            if(version >=20){
            callback(null, posts.toReversed()); //Sólo funciona con Node v20 en adelante
            }
            else{
                const reversedPosts=[];
                for(let i=posts.length-1; i>=0; i--){
                    reversedPosts.push(posts[i]);
                }
                callback(null, reversedPosts);
            }
        })
        
    })
}