import { findUserById, loadPosts } from "../data"
import { validateId, validateCallback } from "./helpers/validators"

export default function retrieweSavePosts(userId, callback){
    validateId(userId, 'user id')
    validateCallback(callback)
    
    const user = 
    findUserById(userId, user => {
            if (!user) {
                callback(new Error(`user with id ${userId} not found`))

                return
            }

            loadPosts(posts => {
                const tmPosts = posts.filter(post => (user.favs.includes(post.id)))

                tmPosts.forEach(post => {
                    post.fav = user.favs.includes(post.id)
        
                    post.author = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    }
                })

                callback(null, tmPosts.toReversed())
            })       
        })
}