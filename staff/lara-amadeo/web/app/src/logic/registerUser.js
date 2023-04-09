import { users } from "../data.js"
import { validateEmail, validatePassword } from "./helpers/validators.js"
import { findUserbyEmail } from "./helpers/data-managers.js" 

export const registerUser = (registrationName, registrationEmail, registrationPassword,registrationRepPassword) => {

    validateEmail(registrationEmail)
    validatePassword(registrationPassword)
    validatePassword(registrationRepPassword, 'new password')

    const foundUser = findUserbyEmail(users, registrationEmail)

    if (foundUser) throw new Error('User already exists')

    if(registrationPassword !== registrationRepPassword) throw new Error('Passwords do not match')
            
    else{ 
        
        let id = 'user-1'
        const lastUser = users[users.length - 1]
        
        id = 'user-' + (Number(lastUser.id.slice(5)) + 1)

        users.push({
                id,
                username: registrationName,
                email: registrationEmail,
                password: registrationPassword
               })

        console.log(users)
    }
}
