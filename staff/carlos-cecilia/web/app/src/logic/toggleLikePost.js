import { validateId } from './helpers/validators'
import { findUserById, findPostById } from './helpers/data-managers'
import { savePost } from '../data'

export default function toggleLikePost(userId, postId) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    const user = findUserById(userId)

    if (!user) throw new Error(`user with id ${userId} not found`)

    const post = findPostById(postId)

    if (!post) throw new Error(`post with id ${postId} not found`)

    if (!post.likes) {
        post.likes = [userId]
    } else {
        //TODO steps
        // - extract index of userId in post.likes
        // - if index < 0 then add userId to post.likes
        // - else if index >= 0 remove userId from post.likes (splice)

        const index = post.likes.indexOf(userId)

        if (index < 0)
            post.likes.push(userId)
        else {
            post.likes.splice(index, 1)

            if (!post.likes.length) delete post.likes
        }
    }

    savePost(post)
}