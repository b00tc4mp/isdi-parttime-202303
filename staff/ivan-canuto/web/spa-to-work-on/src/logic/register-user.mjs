import {validateName, validateEmail, validatePassword} from './helpers/validators.js'
import {findUserByEmail} from './helpers/data-manager.js'
import {saveUsers, users} from '../data.js'

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
      avatar: 'https://img.freepik.com/iconos-gratis/icono-perfil-usuario_318-33925.jpg',
      favPosts: []
  })

  saveUsers(usersApp)
}
