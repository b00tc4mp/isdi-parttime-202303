import {validateId} from './helpers/validators'
import {findUserById, findPostById, saveUser} from '../data'




export default function toggleSavePost(userId, postId) {

    validateId(userId, 'user id')
    validateId(postId, 'post id')


    const user = findUserById(userId)
    if (!user) throw new Error(`user with id ${userId} not found`)

    const post = findPostById(postId)
    if (!post) throw new Error(`user with id ${postId} not found`)

    if (!post.savedPosts) {
        post.savedPosts = [postId]

    } else {

        const index = post.savedPosts.indexOf(postId)

        if (index < 0) 
            post.savedPosts.push(postId)
        else
            post.savedPosts.splice(index, 1)

            if (!post.savedPosts.length) delete post.savedPosts
            
    }

    saveUser(user)
}