console.log('load register-user')

import { validateName, validateEmail, validatePassword } from "./helpers/validators.js"
import { findUserByEmail } from "./helpers/data-managers.js"
import { users } from "../data.js"

export function registerUser(name, email, password) {
    validateName(name)
    validateEmail(email) 
    validatePassword(password)   
  
      let foundUser =findUserByEmail(email)
  
      if(foundUser )
          throw new Error('User already exists') 
  
      const lastUser = users[users.length - 1]
      
      let id = 'user-1'
  
      if(lastUser) 
          id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)
      
      
        const user = ({
          id,
          name,
          email,
          password,
          })
  
      users.push(user)
  }
  