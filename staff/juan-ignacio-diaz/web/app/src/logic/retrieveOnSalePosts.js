import { loadUsers, findUserById, loadPosts } from "../data"
import { validateId, validateCallback } from "./helpers/validators"


export default function retrieveOnSalePosts(userId, callback){
    validateId(userId, 'user id')
    validateCallback(callback)
    
    findUserById(userId, user => {
        if(!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        loadUsers(users => {
            loadPosts(posts => {
                const tmPosts = posts.filter(post => post.price !== 0 && (!post.lock || (post.lock && post.author === userId)))

                tmPosts.forEach(post => {
                    post.fav = user.favs.includes(post.id)
    
                    const author = users.find(user => user.id === post.author)
    
                    post.author = {
                        id: author.id,
                        name: author.name,
                        avatar: author.avatar
                    }
                })
                callback(null, tmPosts.toReversed())

            })
        })
    })
}