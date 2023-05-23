import { findUserById, findPostById } from './helpers/data-manager'
import { savePost } from '../data'

export default function updatePost(userId, postId, image, text) {

    const user = findUserById(userId)

    if (!user) throw new Error(`user with id ${userId} not found`)

    const post = findPostById(postId)

    if (!post) throw new Error(`post with id ${postId} not found`)

    if (post.author !== userId) throw new Error(`post with id ${postId} does not belong to user with id ${userId}`)

    post.image = image
    post.text = text
    post.date = new Date

    savePost(post)
}