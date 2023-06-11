import { findUserById, saveUser } from "../../data.js"
import { context } from '../../ui.js'
import { validators } from "com"

const { validateCallback, validateImage, validateUserId } = validators

export default function uploadImage(userId, image, callback) {

    validateImage(image)
    validateUserId(userId)
    validateCallback(callback)
    const user = findUserById(userId, (error, user) => {
        if (!user) {
            callback(new Error('user not found'))

            return
        }
        user.image = image.src
        context.image = image.src

        saveUser(user, () => callback(null))
    })
}

// TODO 
// forceUpdate Header
// forceUpdate User View