console.debug('load registerUser')

// import { validateName, validateEmail, validatePassword, validateCallback } from "./helpers/validators.js"
// import { loadUsers, saveUsers, findUserByEmail } from "../data.js"
import { validators } from 'com'

const { validateName, validateEmail, validatePassword, validateCallback } = validators

export function registerUser(name, email, password, callback) {
  validateName(name)
  validateEmail(email)
  validatePassword(password)
  validateCallback(callback)

  const xhr = new XMLHttpRequest

  xhr.onload = () => {
    const { status } = xhr

    if (status !== 201) {
      const { response: json } = xhr
      const { error } = JSON.parse(json)

      callback(new Error(error))

      return
    }

    callback(null)
  }

  xhr.onerror = () => {
    callback(new Error('conection error'))
  }

  xhr.open('POST', `${import.meta.env.VITE_API_URL}/users`)

  xhr.setRequestHeader('Content-Type', 'application/json')

  //enviamos los datos del usuario y lo convertimos a json
  const user = { name, email, password }
  const json = JSON.stringify(user)

  xhr.send(json)


  //LOGICA DE BACK--> API
  // findUserByEmail(email, foundUser => {
  //   if (foundUser){
  //     callback(new Error('User already exists'))

  //     return
  //   }

  //   loadUsers(users => {
  //     const lastUser = users[users.length - 1]

  //     let id = 'user-1'
  //     if (lastUser)
  //       id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)

  //     const user = ({
  //       id,
  //       name,
  //       email,
  //       password,
  //       favs: []
  //     })

  //     users.push(user)
  //     saveUsers(users, () => callback(null))
  //     // un callback llama a otro. El callback de loadUser llama al callback de arriba en registerUser: tb podria ponerse saveUsers(users, callback)
  //   })
  // })

}
