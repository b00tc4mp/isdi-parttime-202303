const {
  validators: { validateId, validateText, validateSubject },
  errors: { ExistenceError, ContentError }
} = require('com')
const { User, Post } = require('../data/models')

/**
 * Updates the post with new data
 * 
 * @param {string} userId The user id
 * @param {string} postId The post id
 * @param {string} title The post title
 * @param {string} content The post content
 * @param {string} postSubject The subject related to the post
 * 
 * @returns {Promise} A Promise that resolves when a post is updated successfully, or rejects with an error message if the operation fails
 * 
 * @throws {TypeError} On non-string user id, post id, title or content
 * @throws {ContentError} On user id or post id not equal to 24 characters of length or not hexadecimal, or empty title or content
 * @throws {ExistenceError} On non-existing user or post
 * @throws {Error} On current user is not the post owner
 */

module.exports = (userId, postId, title, content, postSubject) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateText(title, 'post title')
  validateText(content, 'post text')
  validateSubject(postSubject)

  if(title.length > 60) throw new ContentError('The title of the post is too long.')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    const post = await Post.findById(postId)
    if(!post) throw new ExistenceError('Post not found.')

    if (post.author.toString() !== userId) throw new Error('This user is not the owner of the post.')

    await Post.updateOne(
      { _id: postId },
      { $set: { 
        title: title,
        text: content,
        subject: postSubject
      }}
    )
  })()
}