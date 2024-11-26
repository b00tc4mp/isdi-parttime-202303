import { users } from '../data.js'
import {validateEmail, validatePassword} from '../logic/helpers/validators.js'
import {findUserByEmail2} from '../logic/helpers/data-managers.js'


export function authenticateUser(email, password)  {
    debugger
    validateEmail(email)
    validatePassword(password) 
    const user = findUserByEmail2 (email)
    const _users = users()
    
    if (!user) {
        throw new Error('User or password incorrect')
    }

    if (!user.password) {
        throw new Error('User or password incorrect')
    }
    return user.id
}