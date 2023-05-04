console.log('load register user')

import { users } from "../data.js"
import { checkNewUser, validateName, validateEmail, validatePassword } from "./helpers/validators.js"

export const registerNewUser = (userName, userEmail, userPassword, id) => {
    users.push({
        id,
        name: userName,
        email: userEmail,
        password: userPassword
    })
}

export const registerUserFull = (userEmail, userName, userPassword) => {
    checkNewUser(userEmail, users)

    validateName(userName)

    validateEmail(userEmail)

    validatePassword(userPassword)

    const lastUser = users[users.length - 1]

    let id = 'user-1'

    if(lastUser)
        id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)

    registerNewUser(userName.trim(), userEmail, userPassword, id)
}