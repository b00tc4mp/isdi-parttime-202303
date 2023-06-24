console.debug('load retrievePost')

// import { validateId, validateCallback} from "./helpers/validators.js"
import { loadUsers, findPostById } from "../data.js"
import { validators } from 'com'

const {validateId, validateCallback} = validators

export default function retrievePost(userId, postId, callback) {
    validateId(userId)
    validateId(postId)
    validateCallback(callback)

    loadUsers(users => {
        users.some(user => user.id === userId)

        if (!users) {
            callback(new Error(`User with ${userId} not found`))

            return
        }

        findPostById(postId, post => {
            if (!post) {
                callback(new Error(`User with ${postId} not found`))

                return
            }

            callback(null, post)

        })
    })
}