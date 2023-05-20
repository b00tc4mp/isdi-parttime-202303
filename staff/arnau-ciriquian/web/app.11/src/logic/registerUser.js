import { validateEmail, validateName, validateNewPassword, validatePasswordConfirm, validateCallback } from "./helpers/validators"
import { loadUsers, saveUsers, findUserByEmail } from "../data"
import PunAvatar from "../../images/PunIntendedLike.png"
export const DEFAULT_AVATAR_URL = PunAvatar

export function registerUser(name, email, password, passwordConfirm, callback) {
    validateName(name)
    validateEmail(email)
    validateNewPassword(password)
    validatePasswordConfirm(password, passwordConfirm)
    validateCallback(callback)

    findUserByEmail(email, user => {
        if (user) {
            callback(new Error('user already exists'))

            return
        }

        let id = 'user-1'

        loadUsers(users => {
            const lastUser = users[users.length - 1]

            if (lastUser) {
                id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)
            }

            const user = {
                id,
                name,
                email,
                password,
                avatar: DEFAULT_AVATAR_URL
            }

            users.push(user)

            saveUsers(users, () => callback(null))
        })
    })
}