console.log('load register-user')

import { validateName, validateEmail, validatePassword } from "./helpers/validators.js"
import { findUserByEmail } from "./helpers/data-managers.js"
import { users, saveUsers } from "../data.js"

export function registerUser(name, email, password) {
    validateName(name)
    validateEmail(email) 
    validatePassword(password)   
  
      let foundUser =findUserByEmail(email)
  
      if(foundUser )
          throw new Error('User already exists') 
  
      const _users = users()
      const lastUser = _users[_users.length - 1]
      
      let id = 'user-1'
  
      if(lastUser) 
          id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)
      
      
        const user = ({
          id,
          name,
          email,
          password,
          })
  
      _users.push(user)
      saveUsers(_users)
  }
  