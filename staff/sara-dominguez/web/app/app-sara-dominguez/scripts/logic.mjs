console.log('load logic') 

import { validateName, validateEmail, validatePassword, validatedNewPassword, validateUserConfirmNewPassword } from './validators.mjs'
import{ users } from './data.mjs'

 export function registerUser(name, email, password) {
  validateName(name)
  validateEmail(email) 
  validatePassword(password)   

    let foundUser =findUserByEmail(email)

    if(foundUser )
        throw new Error('User already exists') 

    // TODO mark email input in red
    
     users.push({
        name: name,
        email: email,
        password: password,
        })
}


export function authenticateUser (email, password) {
    validateEmail(email)    
    validatePassword(password)
 

    let foundUser= findUserByEmail(email)

    if(!foundUser) throw new Error ('User not found') 
    if (foundUser.password !== password) throw new Error ('Wrong password')
    return foundUser
}

/*
WARN "nice", but not easy to read
return (!foundUser || foundUser.password !== password)? false : true
return !(!foundUser || foundUser.password !== password) 
*/

export function retrieveUser(email) {
   validateEmail(email)
    
    let foundUser = findUserByEmail(email)
   
    if(!foundUser) throw new Error ('User not found') 
    if (foundUser.email !== email) throw new Error ('Wrong email')
        
    else{
        const user = {
            name: foundUser.name, 
            email: foundUser.email
        } 
        return user
    }
}

// Function to validate changes of user avatar

export function updateUserAvatar(email, newAvatar) {
   //validateEmail(email)
  // validateNewAvatar(newAvatar)

   let foundUser = findUserByEmail(email)

    if(!foundUser) throw new Error ('User not found') 
    if (foundUser.email!== email) throw new Error ('Wrong email')
        
    else{
        foundUser.avatar = newAvatar
    }
}




// Function to validate changes or password--homepage-- hay que validarlo con el email

export function validatedNewPassword(email, password, userNewPassword,userConfirmNewPassword) {
    validateEmail(email)
    validatePassword(password)
    validateUserNewPassword(userNewPassword)
    validateUserConfirmNewPassword(userConfirmNewPassword)

    let foundUser= findUserByEmail(email)

    if(!foundUser) throw new Error ('User not found') 
    if (userNewPassword !== userConfirmNewPassword)throw new Error('New password and confirmed password do not match')
    if (foundUser.password !== password) throw new Error ('wrong  actual password') 
    if(password === userNewPassword) throw new Error ('You have to change the password')
    if(foundUser&& userNewPassword === userConfirmNewPassword) foundUser.password = userNewPassword          
}


// Helper functions

export function findUserByEmail(email){

    let foundUser

    for(const i = 0; i< users.length; i++){
        const user = users[i]

        if(user.email === email){
            foundUser= user
        break
        }
    }
    return foundUser
}
