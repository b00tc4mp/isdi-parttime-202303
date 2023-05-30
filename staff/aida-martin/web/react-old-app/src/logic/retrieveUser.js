import { validateId } from './helpers/validators'
import { findUserById } from './helpers/dataManagers'

export default function retrieveUser (userId) {
  validateId(userId, 'User ID')

  let user = findUserById(userId)

  if (!user) throw new Error('User not found 😥', { cause: 'userError' })

  user = {
    name: user.name.split(' ')[0],
    avatar: user.avatar,
    saves: user.saves
  }

  const avatar = user.avatar

  if (user.avatar) {
    user.avatar = avatar
  }

  return user
}
