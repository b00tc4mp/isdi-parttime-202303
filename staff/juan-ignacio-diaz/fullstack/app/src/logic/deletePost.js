import { validators } from 'com'
const { validateId, validateCallback } = validators

import { loadUsers, saveUsers, loadPosts, savePosts} from "../data"

export default function deletePost(userId, postId, callback){
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateCallback(callback)

    loadUsers(users => {

        const  user = users.find(user => user.id === userId)
        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }
    
        loadPosts(posts => {
            const index = posts.findIndex(post => post.id === postId)
    
            if (index < 0) {
                callback(new Error(`post with id ${postId} not found`))

                return
            }

            if (user.id !== posts[index].author){
                callback(new Error(`Post doesn't belong to this user`))

                return
            }  

            posts.splice(index, 1)

            users.forEach(user => { 
                if (user.favs.includes(postId)) 
                    user.favs.splice(user.favs.findIndex(favs => favs===postId), 1)
            })
        
            savePosts(posts, () =>
                saveUsers(users, () => callback(null))
            )
        })
    })
}