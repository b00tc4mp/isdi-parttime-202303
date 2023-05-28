console.log('validated-user-newPasssword')

import { validateId, validatePassword, validateUserNewPassword, validateUserConfirmNewPassword } from "./helpers/validators.mjs"
import { findUserById } from "./helpers/data-managers.mjs"

export function validatedNewPassword(id, password, userNewPassword,userConfirmNewPassword) {
    validateId(id)
    validatePassword(password)
    validateUserNewPassword(userNewPassword)
    validateUserConfirmNewPassword(userConfirmNewPassword)

    let foundUser= findUserById(id)

    if(!foundUser) throw new Error ('User not found') 
    if (userNewPassword !== userConfirmNewPassword)throw new Error('New password and confirmed password do not match')
    if (foundUser.password !== password) throw new Error ('wrong  actual password') 
    if(password === userNewPassword) throw new Error ('You have to change the password')
    
    foundUser.password = userNewPassword          
}
