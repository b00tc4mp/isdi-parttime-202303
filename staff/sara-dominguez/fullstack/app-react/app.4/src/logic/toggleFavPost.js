import { saveUser, findUserById, findPostById } from "../data.js";
// import { validateId, validatePostId, validateCallback } from "./helpers/validators.js";
import { validators } from 'com'

const { validateId, validatePostId, validateCallback } = validators
export default function toggleFavPost(userId, postId, callback) {
    validateId(userId)
    validatePostId(postId)
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'))

            return
        }

        findPostById(postId, post => {
            if (!post) {
                callback(new Error('post not found'))

                return
            }

            const index = user.favs.indexOf(postId)
                if (index < 0) {
                    user.favs.push(postId)
                } else {
                    user.favs.splice(index, 1)

                    if (!user.favs.length) delete user.fav
                }
            

            saveUser(user, () => callback(null))
        })
    })
}