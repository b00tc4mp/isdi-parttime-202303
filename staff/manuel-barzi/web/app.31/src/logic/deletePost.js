import { validateId } from './helpers/validators'
import { findUserById, findPostById } from './helpers/data-managers'
import { savePosts, posts } from '../data'

export default function deletePost(userId, postId) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    const user = findUserById(userId)

    if (!user) throw new Error(`user with id ${userId} not found`)

    const post = findPostById(postId)

    if (!post) throw new Error(`post with id ${postId} not found`)

    if (post.author !== userId) throw new Error(`post with id ${postId} does not belong to user with id ${userId}`)

    const _posts = posts()

    const index = _posts.findIndex(post => post.id === postId)

    _posts.splice(index, 1)

    savePosts(_posts)
}