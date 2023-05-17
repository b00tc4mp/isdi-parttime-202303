import {validateEmail, validatePassword} from './helpers/validators'
import {findUserByEmail} from './helpers/dataManager'

/**
 * Authenticates an user by email and password
 * 
 * @param {string} email The user's email
 * @param {string} password The user's password
 * 
 * @returns {string} The user's id
 */

export default function authenticateUser(email, password) {

  validateEmail(email)
  validatePassword(password)

  const user = findUserByEmail(email)

  if (!user) throw new Error('User not found.')
  if (user.password !== password) throw new Error('Password is incorrect.')

  return user.id  
}
