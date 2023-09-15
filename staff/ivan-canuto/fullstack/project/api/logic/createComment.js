const {
  validators: { validateId, validateComment },
  errors: { ExistenceError }
} = require('com')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

const { User, Post } = require('../data/models')

/**
 * Creates a comment
 * 
 * @param {string} userId The user id
 * @param {string} postId The post id
 * @param {string} commentText The comment text
 * 
 * @returns {promise} A Promise that resolves when the comment is created, or rejects with an error message if the comment creation fails
 * 
 * @throws {TypeError} On non-string user id, post id or comment text
 * @throws {ContentError} On user id or post id not equal to 24 characters of length or not hexadecimal or not hexadecimal, empty comment text, or comment text longer than 200 characters.
 * @throws {ExistenceError} On non-existing user or post
 */

module.exports = (userId, postId, commentText) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateComment(commentText, 'comment text')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    const post = await Post.findById(postId)
    if(!post) throw new ExistenceError('Post not found.')

    const newComment = { author: user.name, authorId: new ObjectId(userId), text: commentText }

    post.comments.push(newComment)

    await post.save()

    // await Post.updateOne(
    //   { _id: postId },
    //   { $push: { comments: { author: user.name, authorId: new ObjectId(userId), text: commentText }}}
    // )
  })()
}