import { validateId } from './helpers/validators'
import { saveUser } from '../data'
import { findUserById, findPostById } from './helpers/data-managers'

export default function toggleFavPost(userId, postId) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    findUserById(userId, user => {
        if (!user) {
            throw new Error(`user with id ${userId} not found`)
        }

        findPostById(postId, post => {
            if (!post) {
                new Error(`post with id ${postId} not found`)
            }

            const index = user.favs.indexOf(postId)

            if (index < 0)
                user.favs.push(postId)
            else
                user.favs.splice(index, 1)

            saveUser(user)
        })
    })
}