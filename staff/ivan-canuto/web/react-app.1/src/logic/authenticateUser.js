import {validateEmail, validatePassword} from './helpers/validators'
import {findUserByEmail} from './helpers/dataManager'

export default function authenticateUser(email, password) {

  validateEmail(email)
  validatePassword(password)

  const user = findUserByEmail(email)

  if (!user) throw new Error('User not found.')
  if (user.password !== password) throw new Error('Password is incorrect.')

  return user.id  
}
