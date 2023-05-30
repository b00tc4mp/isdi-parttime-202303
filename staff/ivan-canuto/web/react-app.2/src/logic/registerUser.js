import {validateName, validateEmail, validatePassword} from './helpers/validators'
import {findUserByEmail} from './helpers/dataManager'
import {saveUsers, users} from '../data'

/**
 * Registers a new user with a name, an email, and a password
 * 
 * @param {string} name The user's name
 * @param {string} email The user's email
 * @param {string} password The user's password
 */

export function registerUser(name, email, password) {
  const usersApp = users()

  validateName(name)
  validateEmail(email)
  if (!email.includes('@')) throw new Error("Email doesn't contain a '@'.")
  if (!email.includes('.')) throw new Error("Email doesn't contain a'.', try to put a dot whithin the domain part.")
  validatePassword(password)
  if (password.length < 6) throw new Error('The password is too short.')

  var user = findUserByEmail(email)
  if (user) throw new Error('User already exists.')

  let id = 'user-1'
  
  let lastUser = usersApp[usersApp.length - 1]
  if(lastUser) id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)

  usersApp.push({
      id,
      name,
      email,
      password,
      avatar: 'https://img.freepik.com/iconos-gratis/icono-perfil-usuario_318-33925.jpg'
  })

  saveUsers(usersApp)
}
