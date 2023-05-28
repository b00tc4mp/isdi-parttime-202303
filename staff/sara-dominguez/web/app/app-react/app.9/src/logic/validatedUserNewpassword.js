console.log('validated-user-newPasssword')

import { validateId, validatePassword, validateUserNewPassword, validateUserConfirmNewPassword } from "./helpers/validators.js"
import { saveUser, findUserById } from "../data.js"

export function validatedNewPassword(userId, password, userNewPassword,userConfirmNewPassword) {
    validateId(userId)
    validatePassword(password)
    validateUserNewPassword(userNewPassword)
    validateUserConfirmNewPassword(userConfirmNewPassword)

    let user= findUserById(userId)

    if(!user) throw new Error ('User not found') 
    if (userNewPassword !== userConfirmNewPassword)throw new Error('New password and confirmed password do not match')
    if (user.password !== password) throw new Error ('wrong  actual password') 
    if(password === userNewPassword) throw new Error ('You have to change the password')
    
    user.password = userNewPassword    
    saveUser(user)      
}
