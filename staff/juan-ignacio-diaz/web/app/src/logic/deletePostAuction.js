import { validateId, validateNumber } from './helpers/validators'
import { findUserById } from './helpers/dataManagers'
import { postsAuction, savePostsAuction } from '../data'

export default function deletePostAuction(userId, postId) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    const user = findUserById(userId)

    if (!user) throw new Error(`user with id ${userId} not found`)

    const tmpPostsAuction = postsAuction()

    const index = tmpPostsAuction.findIndex(postAuction => postAuction.id === postId)

    if (index >= 0) tmpPostsAuction.splice(index , 1)
    else throw new Error(`post with id ${postId} not found`)

    savePostsAuction(tmpPostsAuction)
}