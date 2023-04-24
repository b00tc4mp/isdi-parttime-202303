import { validateEmail, validatePassword } from "./helpers/validators.js";
import { findUserByEmail } from "./helpers/data-managers.js"

export const authenticateUser = (loginEmail, loginPassword)=>{
  
  validateEmail(loginEmail)
  validatePassword(loginPassword)

  let user = findUserByEmail(loginEmail);
  if(!user) throw new Error('User not found.')
  if(loginPassword !== user.password) throw new Error('Incorrect password.')

  return user.id
}
