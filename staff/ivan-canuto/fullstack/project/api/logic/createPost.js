require('dotenv').config()
const { validators: { validateId, validateNewPostTitle, validateNewPostContent, validateSubject } } = require('com')
const { errors: { ExistenceError } } = require('com')

const { User, Post } = require('../data/models')

/**
 * Creates a post from scratch wit a summary provided by user
 * 
 * @param {string} userId The user id
 * @param {string} title The title of the post
 * @param {string} summary The summary content of the post
 * @param {string} postSubject The subject related to the post
 * 
 * @returns {Promise} A Promise that resolves when a post is created successfully, or rejects with an error message if the post creation fails
 * 
 * @throws {TypeError} On non-string user id, conversation id or summary text
 * @throws {ContentError} On user id or conversation id not equal to 24 characters of length or not hexadecimal or not hexadecimal, or empty summary text
 * @throws {ExistenceError} On non-existing user or conversation
 */

module.exports = (userId, title, summary, postSubject) => {
  validateId(userId, 'user id')
  validateNewPostTitle(title)
  validateNewPostContent(summary)
  validateSubject(postSubject)

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError(`User not found.`)

    await Post.create({
      author: user._id,
      title,
      text: summary,
      subject: postSubject
    })
  })()
}