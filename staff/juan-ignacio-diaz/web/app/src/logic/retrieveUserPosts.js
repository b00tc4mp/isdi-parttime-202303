import { findUserById, loadPosts } from "../data"
import { validateId, validateCallback } from "./helpers/validators"


export default function retrieweUserPosts(userId, callback){
    validateId(userId, 'user id')
    validateCallback(callback)
    
    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }
    
        loadPosts(posts => {
            posts.filter(post => post.author === userId)
            
            posts.forEach(post => {
                post.fav = user.favs.includes(post.id)
    
                post.author = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar
                }
            })
    
            callback(null, posts.toReversed())
        })
    })
}