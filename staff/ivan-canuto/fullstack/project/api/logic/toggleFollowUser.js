const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')
const { User } = require('../data/models')
  
/**
 * Sets and unsets an app user as 'following' by the current user
 * 
 * @param {string} userId The user id
 * @param {string} profileUserId The profile user id
 * 
 * @returns {Promise} A Promise that resolves when a user id followed/unfollowed successfully, or rejects with an error message if the operation fails
 * 
 * @throws {TypeError} On non-string user id or post id
 * @throws {ContentError} On user id or post id not equal to 24 characters of length or not hexadecimal
 * @throws {ExistenceError} On non-existing user or post
 */

module.exports = (userId, profileUserId) => {
  validateId(userId, 'user id')
  validateId(profileUserId, 'profile user id')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    const profileUser = await User.findById(profileUserId)
    if(!profileUser) throw new ExistenceError('Profile user not found.')

    let followingUsers = user.following.map(follow => follow.id.toString())

      if(followingUsers.includes(profileUserId)) {
        await User.updateOne(
          { _id: userId },
          { $pull: { following: { id: new ObjectId(profileUserId) } }}
        )
        await User.updateOne(
          { _id: profileUserId },
          { $pull: { followers: { id: new ObjectId(userId) } } }
        )
      }
      else {
        await User.updateOne(
          { _id: userId },
          { $push: { following: { id: new ObjectId(profileUserId), username: profileUser.username, name: profileUser.name, avatar: profileUser.avatar } } }
        )
        await User.updateOne(
          { _id: profileUserId },
          { $push: { followers: { id: new ObjectId(userId), name: user.name, username: user.username, avatar: user.avatar } } }
        )
      }
  })()
}