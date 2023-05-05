console.log('load register user')

import { saveUsers, users } from "../data"
import { checkNewUser, validateName, validateEmail, validatePassword } from "./helpers/validators"

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

    const _users = users()
    
    let id = 'user-1'
    
    const lastUser = _users[_users.length - 1]

    if(lastUser)
        id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)

    _users.push({
        id,
        name: userName,
        email: userEmail,
        password: userPassword
    })

    saveUsers(_users)

    // registerNewUser(userName.trim(), userEmail, userPassword, id)
}