import { findUserByEmail } from '../data'

export default function authenticateUser(email, password, callback) {
   
    findUserByEmail(email, user => {
        if (!user) {
            callback(new Error('user not found'))

            return
        }
    
        if (user.password !== password) {
            callback(new Error('wrong password'))

            return
        }
    
        callback(null, user.id)
    })
}