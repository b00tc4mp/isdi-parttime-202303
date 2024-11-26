import { findUserById } from "./helpers/data-managers.js"
import { validateEmail } from "./helpers/validators.js"
import { userAccount } from "../pages/user-account.js"
import { saveUsers } from "../data.js"

export function updateUserEmail(userId, newEmail) {
    var user = findUserById(userId)
    var newEmail = userAccount.querySelector('form.user-info input[name="email"]').value

    validateEmail(newEmail)
    const currentUserEmail = findUserById(userId)

        if (user.email !== currentUserEmail.email && user.email === newEmail){
            throw new Error('Email already registered')
        }
        if (user.email === currentUserEmail.email && user.email !== newEmail){
            user.email = newEmail
            userAccount.querySelector('form.user-info input[name="name"]').disabled = true
            userAccount.querySelector('form.user-info input[name="email"]').disabled = true
            userAccount.querySelector('.message').classList.add('success')
            userAccount.querySelector('p.message').innerHTML = 'User info updated!'
            saveUsers ()
        }
 }
