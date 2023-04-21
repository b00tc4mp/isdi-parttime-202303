import { users, posts } from "../data.js"
import { validateId } from "./helpers/validators.js"

export function retrievePosts(userId) {

  validateId(userId, 'user id')

  let user = users.some(user => user.id === userId)

  if (!user) throw new Error(`User with ${userId} not found.`)

  return posts.toReversed()
}
