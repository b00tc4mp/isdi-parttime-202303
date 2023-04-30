import { users } from '../data.js'



export function authenticateUser(email, password)  {
    validateEmail(email)
    validatePassword(password) 
    const user = findUserByEmail (email)
    const _users = users()
    
    if (!user) {
        throw new Error('User or password incorrect')
    }

    if (!user.password) {
        throw new Error('User or password incorrect')
    }
    return user.id
}