import { validateEmail, validatePassword } from './helpers/validators.js'
import { findUser } from './helpers/data-managers.js'

export const authenticateUser = (userEmail, userPassword, homePage, avatarImg) => {
    validateEmail(userEmail)
    validatePassword(userPassword)

    const foundUser = findUser(userEmail)
    
    if(foundUser === undefined || foundUser.password !== userPassword) throw new Error('Wrong email or password', {cause: "ownError"})

    return foundUser.id
}