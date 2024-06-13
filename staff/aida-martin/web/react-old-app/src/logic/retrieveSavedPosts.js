import { validateId } from './helpers/validators'
import { posts } from '../data'
import retrieveUser from './retrieveUser'

export default function retrieveSavedPosts (userId, mySavedPosts = false) {
  validateId(userId, 'User ID')

  if (!mySavedPosts) {
    return posts().toReversed() // TODO toSorted (para que se ordenen por fecha)
  }
  const user = retrieveUser(userId)

  return posts().filter((post) => user.saves?.includes(post.id)).toReversed()
}
