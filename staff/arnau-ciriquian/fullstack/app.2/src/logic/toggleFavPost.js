import { findPostById, findUserById, saveUser } from "../data"
import { validateCallback, validateId } from "../../../com/validators"

export default function toggleFavPost(postId, userId, callback) {
    validateId(postId, 'post id')
    validateId(userId, 'user id')
    validateCallback(callback)

    findPostById(postId, post => {
        if (!post) {
            callback(new Error('post not found'))

            return
        }

        findUserById(userId, user => {
            if (!user) {
                callback(new Error(`user not found`))

                return
            }

            const index = user.favs.indexOf(postId)

            if (index < 0)
                user.favs.push(postId)
            else {
                user.favs.splice(index, 1)
            }

            saveUser(user, () => callback(null))
        })
    })
}