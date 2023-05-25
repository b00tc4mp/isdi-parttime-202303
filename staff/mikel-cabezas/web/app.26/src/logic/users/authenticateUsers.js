// import { users } from '../../data.js'
import { validateEmail, validatePassword } from '../helpers/validators.js'
import { findUserByEmail } from '../../data.js'

export default function authenticateUser(email, password, callback)  {
    validateEmail(email)
    validatePassword(password) 

    findUserByEmail(email, user => {
        if (!user) {
            callback(new Error('User or password incorrect'))
            
            return
        }
    
        if (!user.password) {
            callback(new Error('User or password incorrect'))
            
            return
        }
        callback(null, user.id)

    })
    
}