import { validateEmail, validatePassword } from './helpers/validators'
import { findUserByEmail } from './helpers/dataManagers'

export default function authenticateUser (email, password) {
  validateEmail(email)
  validatePassword(password)

  const foundUser = findUserByEmail(email)

  if (!foundUser) throw new Error('User not found 😥', { cause: 'userError' })

  if (foundUser.password !== password) {
    throw new Error('Wrong password 😥', { cause: 'userError' })
  }

  return foundUser.id
}
