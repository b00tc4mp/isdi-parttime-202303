import { validateId } from './helpers/validators'
import { findUserById, findPostById } from './helpers/data-managers'
import { saveUser, savePost } from '../data'

export default function toggleLikePost(userId, postId) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    findUserById(userId, user => {
        if (!user) {
            throw new Error(`User with id ${userId} does not exist`)
        }

        findPostById(postId, post => {
            if (!post) {
                throw new Error(`Post with id ${postId} does not exist`)
            }

            const index = user.favs.indexOf(postId)

            if (index < 0) {
                user.favs.push(postId)
            } else
                user.favs.splice(index, 1)

            saveUser(user)
            savePost(post)

        })

    })


}