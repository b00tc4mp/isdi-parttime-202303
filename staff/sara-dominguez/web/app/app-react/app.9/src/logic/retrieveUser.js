console.log('load retrieve-user')

import { validateId } from "./helpers/validators.js"
import { findUserById } from "../data.js"

export default function retrieveUser(userId, callback) {
    validateId(userId)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error('User not found'))

            return

        }else {
            const _user = {
                name: user.name,
                avatar: user.avatar
            }

            // if (user.avatar)
            //     user.avatar = user.avatar

            callback(null, _user)
        }
    })
}

