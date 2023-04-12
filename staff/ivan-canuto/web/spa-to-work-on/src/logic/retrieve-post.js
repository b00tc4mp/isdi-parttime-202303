import { findUserById } from "./helpers/data-manager.js"
import { users, posts } from "../data.js"
import { validateId } from "./helpers/validators.js"

export function retrievePost(userId) {

  validateId(userId, 'user id')

  let foundUser = users.some(user => user.id === userId)

  if (!foundUser) throw new Error(`User with ${userId} not found.`)

  return posts.toReversed()
}
