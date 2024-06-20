import { validateCallback, validateEmail, validatePassword } from './helpers/validators'
import { findUserByEmail } from '../data'

/**
 * Authenticates an user by email and password
 * 
 * @param {string} email The user's email
 * @param {string} password The user's password
 * @param {function} callBack A function to catch the errors and show them to the user
 */

export default function authenticateUser(email, password, callBack) {

  validateEmail(email)
  validatePassword(password)
  validateCallback(callBack)

  findUserByEmail(email, (user) => {

    if(!user){
      callBack(new Error('User not found.'))

      return
    }
    
    if(user.password !== password) {
      callBack(new Error('Password is incorrect.'))

      return
    }

    callBack(null, user.id)
  })
}
