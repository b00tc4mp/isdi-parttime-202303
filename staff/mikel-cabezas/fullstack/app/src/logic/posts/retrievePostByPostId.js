import { findPostbyId, findUserById } from "../../data"
import { validators } from "com"

const { validateUserId } = validators
export default function retrievePostByPostId(userId, postId, callback) {
    validateUserId(userId)

    findUserById(userId, foundUser => {
        if (!foundUser) {
            callback(new Error(`there is no user with this current ${userId} id`))

            return
        }

        findPostbyId(postId, foundPost => {
            callback(null, foundPost)
        })
    })

}
