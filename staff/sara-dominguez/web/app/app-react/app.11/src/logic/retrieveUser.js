console.log('load retrieve-user')

import { validateId, validateCallback } from "./helpers/validators.js"
import { findUserById } from "../data.js"

export default function retrieveUser(userId, callback) {
    validateId(userId)
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error('User not found'))

            return

        }else {
            const _user = {
                name: user.name,
                avatar: user.avatar,
                favs: user.favs
            }

            // if (user.avatar)
            //     user.avatar = user.avatar

            callback(null, _user)
        }
    })
}

