import { validateName, validateEmail, validatePassword, validateCallback } from 'com'
import { saveUsers, findUserByEmail, loadUsers } from '../data'

export default function registerUser(name, email, password, callback) {
    validateName(name)
    validateEmail(email)
    validatePassword(password)
    validateCallback(callback)

    findUserByEmail(email, foundUser => {
        if (foundUser) {
            callback(new Error('user already exists'))

            return
        }

        let id = 'user-1'

        loadUsers(users => {
            const lastUser = users[users.length - 1]

            if (lastUser)
                id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)

            const user = {
                id,
                name,
                email,
                password,
                favs: []
            }

            users.push(user)

            saveUsers(users, () => callback(null))
        })
    })
}