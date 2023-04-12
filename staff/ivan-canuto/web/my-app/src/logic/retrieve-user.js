import { findUserByEmail } from "./helpers/data-managers.js"

export const retrieveUser = (email)=>{
  if(!email.length) throw new Error("The email doesn't exist.")
  if(typeof email !== 'string') throw new Error("Email is not a string.")

  let user = findUserByEmail(email)

  if(!user) throw new Error("User not found.")

  user = {
    name: user.name,
    email: user.email,
    avatar: user.avatar
  }
  return user;
}
