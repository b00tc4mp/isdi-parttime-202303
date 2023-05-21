import { users } from '../../data.js'
import { validateEmail, validatePassword } from '../helpers/validators.js'
import { findUserByEmail } from '../helpers/dataManagers.js'

export default function authenticateUser(email, password)  {
    validateEmail(email)
    validatePassword(password) 
    const _users = users()
    const user = findUserByEmail(email)
    
    if (!user) {
        throw new Error('User or password incorrect')
    }

    if (!user.password) {
        throw new Error('User or password incorrect')
    }
    return user.id
}