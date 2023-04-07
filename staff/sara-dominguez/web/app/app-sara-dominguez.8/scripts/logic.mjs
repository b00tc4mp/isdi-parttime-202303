console.log('load logic') 

import { validateName, validateEmail, validatePassword, validateUserNewPassword,validateUserAvatar,  validateUserConfirmNewPassword, validateId } from './validators.mjs'
import {users} from './data.mjs'

 export function registerUser(name, email, password) {
  validateName(name)
  validateEmail(email) 
  validatePassword(password)   

    let foundUser =findUserByEmail(email)

    if(foundUser )
        throw new Error('User already exists') 

    const lastUser = users[users.length - 1]
    
    let id = 'user-1'

    if(lastUser) 
        id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)
    
    
      const user = ({
        id,
        name,
        email,
        password,
        })

    users.push(user)
}


export function authenticateUser (email, password) {
    validateEmail(email)    
    validatePassword(password)
 

    let foundUser= findUserByEmail(email)

    if(!foundUser) 
        throw new Error ('User not found') 

    if (foundUser.password !== password) 
        throw new Error ('Wrong password')
    
    return foundUser.id
}

/*
WARN "nice", but not easy to read
return (!foundUser || foundUser.password !== password)? false : true
return !(!foundUser || foundUser.password !== password) 
*/

export function retrieveUser(userId) {
   validateId(userId)
    
    let foundUser = findUserById(userId)
   
    if(!foundUser) throw new Error ('User not found') 

    else{
        const user = {
            name: foundUser.name, 
        } 
        if(foundUser.avatar) 
            user.avatar = foundUser.avatar

        return user
    }
}

// Function to validate changes of user avatar

export function updateUserAvatar(id, newAvatar) {
    validateId(id)
    validateUserAvatar(newAvatar)

   let foundUser = findUserById(id)

    if(!foundUser) throw new Error ('User not found') 
    if (foundUser.id!== id) throw new Error ('Wrong email')
        
    else{
        foundUser.avatar = newAvatar
    }
}




// Function to validate changes or password--homepage-- hay que validarlo con el email

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


// Helper functions

export function findUserByEmail(email){

    let foundUser

    for(let i = 0; i< users.length; i++){
        let user = users[i]

        if(user.email === email){
            foundUser= user
        break
        }
    }
    return foundUser
}
export function findUserById(userId){

    let foundUser

    for(let i = 0; i< users.length; i++){
        let user = users[i]

        if(user.id === userId){
            foundUser= user
        break
        }
    }
    return foundUser
}
