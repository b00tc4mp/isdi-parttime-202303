import { findUserById } from "./helpers/data-manager.js"

export function retrieveUser(userId) {

  if (!userId.length) throw new Error("This email doesn't exist.")
  if (typeof userId !== 'string') throw new Error('Eamil is not a string.')

  let user = findUserById(userId)

  if (!user) throw new Error('User not found.')

  user = {
    id: user.id,
    name: user.name,
    avatar: user.avatar
  }
  return user
}
