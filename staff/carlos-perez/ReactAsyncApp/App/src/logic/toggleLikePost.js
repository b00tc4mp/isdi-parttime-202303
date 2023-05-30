import {findPostById, findUserById } from './helpers/data-manager'
import { savePost } from '../data'

export default function toggleLikePost(userId, postId) {

    const user = findUserById(userId);

    if (!user) throw new Error(`user with id ${userId} not found`)

    const post = findPostById(postId);

    if (!post) throw new Error(`post with id ${postId} not found`)

    if (!post.likes) {
        post.likes = [userId]
    } else {

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