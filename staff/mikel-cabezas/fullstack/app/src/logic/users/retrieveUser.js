import { findUserById } from "../../data"
import { validators } from "com"

const { validateCallback, validateUserId } = validators

export default function retrieveUser(userId, callback) {
    validateUserId(userId)
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'))

            return
        }
        const _user = {
            name: user.name,
            email: user.email,
            image: user.image,
            favPosts: user.favPosts
        }
        callback(null, _user)
    })

}