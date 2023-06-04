const { readFile, writeFile } = require('fs')

module.exports = function toggleLikePost(userId, postId, callback){

    let users
    let user
    let posts
    let post
    readFile('./data/users.json', (error, usersJson) => {
        if(error){
            callback(error)

            return
        }

        users = JSON.parse(usersJson)

        user = users.find(user => user.id === userId)

        if(!user){
            callback(`User with id ${userId} not found`)

            return
        }

        readFile('./data/posts.json', (error, postsJson) => {
            if(error){
                callback(error)
    
                return
            }
    
            posts = JSON.parse(postsJson)
    
            post = posts.find(post => post.id === postId)

            if(!post){
                callback(`Post with id ${postId} not found`)
    
                return
            }

            
            if(!user.likedPosts.includes(post.id)){
                    post.likes.push(userId)
                    user.likedPosts.push(post.id)

                    usersJson = JSON.stringify(users)
                    
                    writeFile('./data/users.json', usersJson, error => {
                        if(error){
                            callback(error)
                            return
                        }
        
                        postsJson = JSON.stringify(posts)
        
                        writeFile('./data/posts.json', postsJson, error => {
                            if(error){
                                callback(error)
                                return
                            }
        
                            callback(null)
                        })
                    })
            } else {
                const indexPostInUser = user.likedPosts.findIndex(elem => elem === post.id)
                user.likedPosts.splice(indexPostInUser, 1)
    
                const indexUserInPost = post.likes.findIndex(elem => elem.id === userId) 
                post.likes.splice(indexUserInPost, 1)

                usersJson = JSON.stringify(users)
                
                writeFile('./data/users.json', usersJson, error => {
                    if(error){
                        callback(error)
                        return
                    }
    
                    postsJson = JSON.stringify(posts)
    
                    writeFile('./data/posts.json', postsJson, error => {
                        if(error){
                            callback(error)
                            return
                        }
    
                        callback(null)
                    })
                })
            }
        })
    })
}