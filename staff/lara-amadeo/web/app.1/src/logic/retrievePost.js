import { findPostById, findUserbyId } from "../data"

/**
 * Returns a post searched by id
 * @param {string} userId user's id
 * @param {string} postId post's id
 * @returns {object} the founded post
 */

export default function retrievePost(userId, postId, callback){

    findUserbyId(userId, user => {
        if(!user){
            callback(new Error('User not found'))
            return
        }

        findPostById(postId, post => {
            if(!post){
                callback(new Error('Post not found'))
                return
            }
            callback(null, post)
        })
    })
}