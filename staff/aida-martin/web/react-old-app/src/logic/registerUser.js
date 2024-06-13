import {
  validateName,
  validateEmail,
  validatePassword
} from './helpers/validators'
import { findUserByEmail } from './helpers/dataManagers'
import { users, saveUsers } from '../data'

export default function registerUser (name, email, password, repeatPassword) {
  validateName(name)
  validateEmail(email)
  validatePassword(password)

  const foundUser = findUserByEmail(email)

  if (foundUser) {
    throw new Error('You are already registered! Please login! 😅', {
      cause: 'userError'
    })
  }

  if (password !== repeatPassword) { throw new Error('Passwords do not match 😥', { cause: 'userError' }) }

  let id = 'user-1'

  // Con barra baja por hacer una variable "privada". Hacemos esto para no llamar a la función dos veces después en lastUser
  const _users = users()

  const lastUser = _users[_users.length - 1]

  if (lastUser) {
    id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)
  }

  const user = {
    id,
    name,
    email,
    password
  }

  _users.push(user)

  saveUsers(_users)
}
