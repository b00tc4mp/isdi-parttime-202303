import { findUserById } from "./helpers/dataManager";
import { validateId } from "./helpers/validators";


export default function retrieveUser(userId) {
  validateId(userId)

  let user = findUserById(userId)

  if(!user) throw new Error('User not found.')

  user = {
    name: user.name,
    avatar: user.avatar,
    favPosts: user.favPosts
  }

  return user
}