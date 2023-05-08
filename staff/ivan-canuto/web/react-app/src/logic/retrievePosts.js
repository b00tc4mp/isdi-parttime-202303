import { users, posts } from "../data"
import { validateId } from "./helpers/validators"

export function retrievePosts(userId) {
  const usersApp = users()
  const postsApp = posts()

  validateId(userId, 'user id')

  let user = usersApp.some(user => user.id === userId)

  if (!user) throw new Error(`User with ${userId} not found.`)

  return postsApp.toReversed()
}