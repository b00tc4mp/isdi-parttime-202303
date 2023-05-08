import {validateEmail, validatePassword} from './helpers/validators.js'
import {findUserByEmail} from './helpers/data-manager.js'

export function authenticateUser(email, password) {

  validateEmail(email)
  validatePassword(password)

  const user = findUserByEmail(email)

  if (!user) throw new Error('User not found.')
  if (user.password !== password) throw new Error('Password is incorrect.')

  return user.id  
}
