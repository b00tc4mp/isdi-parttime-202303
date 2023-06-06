import { validateId, validateCallback } from './helpers/validators';
import { savePost, findUserById, findPostById } from '../data'


export default function lockPost(userId, postId, callback){
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error("Error to user"))

            return
        }

        findPostById(postId, post =>{
            if (!post) {
                callback(new Error(`post with id ${postId} not found`))
        
                return
            }
        
            post.lock = post.lock? false : true
            
            savePost(post, () => callback(null))
        })
    })
}