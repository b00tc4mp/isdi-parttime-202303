import { validateName, validateEmail, validatePassword, validateCallback } from './helpers/validators'
import { loadUsers, saveUsers, findUserByEmail } from '../data'

/**
 * Registers a new user with a name, an email, and a password
 * 
 * @param {string} name The user's name
 * @param {string} email The user's email
 * @param {string} password The user's password
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export function registerUser(name, email, password, callBack) {

  validateName(name)
  validateEmail(email)
  validateCallback(callBack)

  if (!email.includes('@')) throw new Error("Email doesn't contain a '@'.")
  if (!email.includes('.')) throw new Error("Email doesn't contain a'.', try to put a dot whithin the domain part.")
  validatePassword(password)
  if (password.length < 6) throw new Error('The password is too short.')

  findUserByEmail(email, (user) => {
    if (user) {
      callBack(new Error('User already exists.'))
    
      return
    }

    let id = 'user-1'

    loadUsers(users => {

      let lastUser = users[users.length - 1]
      if(lastUser) id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)
  
      users.push({
          id,
          name,
          email,
          password,
          avatar: 'https://img.freepik.com/iconos-gratis/icono-perfil-usuario_318-33925.jpg',
          favs: []
      })
  
      saveUsers(users, () => callBack(null))
    })
  })
  
}
