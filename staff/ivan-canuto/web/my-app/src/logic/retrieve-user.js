import { findUserById } from "./helpers/data-managers.js"

export const retrieveUser = (userId)=>{
  if(!userId.length) throw new Error("The user id doesn't exist.")
  if(typeof userId !== 'string') throw new Error("The user id is not a string.")

  let user = findUserById(userId)

  if(!user) throw new Error("User not found.")

  user = {
    name: user.name,
    email: user.email,
    avatar: user.avatar
  }
  return user;
}
