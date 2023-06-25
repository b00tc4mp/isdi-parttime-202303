import { validators } from 'com'
const { validateCallback, validateId } = validators

import { saveUser, findUserByEmail, findUserById } from "../data"

export function updateUserEmail(userId, email, newEmail, newEmailConfirmation, password, callback) {
    validateId(userId, 'user id')
    validateCallback(callback)
    if (!newEmail.match(/\S+@\S+\.\S+/)) throw new Error('new email is not a valid adress')
    if (newEmail !== newEmailConfirmation) throw new Error('new email confirmation is different than new email')

    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'))

            return
        }

        if (email !== user.email) {
            callback(new Error('email does not correspond to actual email'))

            return
        }

        if (password !== user.password) {
            callback(new Error('incorrect password'))

            return
        }

        findUserByEmail(newEmail, _user => {
            if (_user) {
                callback(new Error('new email already registered'))

                return
            }

            user.email = newEmail

            saveUser(user, () => callback(null))
        })
    })
}