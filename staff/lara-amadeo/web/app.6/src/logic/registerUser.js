import { saveUsersInStorage, users } from "../data.js"
import { validateEmail, validatePassword } from "./helpers/validators.js"
import { findUserbyEmail } from "./helpers/data-managers.js"
import { DEFAULT_AVATAR_URL } from "../ui.js"

export const registerUser = (registrationName, registrationEmail, registrationPassword, registrationRepPassword) => {

    validateEmail(registrationEmail)
    validatePassword(registrationPassword)
    validatePassword(registrationRepPassword, 'new password')

    const _users = users()
    const foundUser = findUserbyEmail(_users, registrationEmail)

    if (foundUser) throw new Error('User already exists')

    if (registrationPassword !== registrationRepPassword) throw new Error('Passwords do not match')

    else {
        let id = 'user-1'
        const lastUser = _users[_users.length - 1]

        if (lastUser)
            id = 'user-' + (Number(lastUser.id.slice(5)) + 1)

        _users.push({
            id,
            username: registrationName,
            email: registrationEmail,
            password: registrationPassword,
            avatar: DEFAULT_AVATAR_URL,
            likedPosts: ['populate']
        })


        saveUsersInStorage(_users)
    }
}
