console.log('load registerUser')

import { validateName, validateEmail, validatePassword } from "./helpers/validators.js"
import { loadUsers, saveUsers, findUserByEmail } from "../data.js"

export function registerUser(name, email, password, callback) {
  validateName(name)
  validateEmail(email)
  validatePassword(password)

  findUserByEmail(email, foundUser => {
    if (foundUser){
      callback(new Error('User already exists'))

      return
    }
    
    loadUsers(users => {
      const lastUser = users[users.length - 1]

      let id = 'user-1'
      if (lastUser)
        id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)

      const user = ({
        id,
        name,
        email,
        password,
      })

      users.push(user)
      saveUsers(users, () => callback())
      // un callback llama a otro. El callback de loadUser llama al callback de arriba en registerUser: tb podria ponerse saveUsers(users, callback)
    })
  })

}
