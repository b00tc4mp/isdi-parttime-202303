import {validateId} from './helpers/validators.mjs'
import {findUserById, findPostById} from './helpers/data-managers.mjs'
import {savePosts} from '../data.mjs'



export default function toggleLikePost(userId, postId) {

    validateId(userId, 'user id')
    validateId(postId, 'post id')


    const user = findUserById(userId)
    if (!user) throw new Error(`user with id ${userId} not found`)

    const post = findPostById(postId)
    if (!post) throw new Error(`user with id ${postId} not found`)

    if (!post.likes) {
        post.likes = [userId]

    } else {

        const index = post.likes.indexOf(userId)

        if (index < 0) 
            post.likes.push(userId)
        else
            post.likes.splice(index, 1)

            if (!post.likes.length) delete post.likes
            
    }

    savePosts()
}