const {
  validators: { validateId },
  errors: { ExistenceError }
} = require("com")
const { User, Post, Suggestion } = require("../data/models")
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

module.exports = (userId, postId) => {
  validateId(userId, "user id")

  return (async () => {
    const user = await User.findById(userId)
    if (!user) throw new ExistenceError("User not found.")

    const post = await Post.findById(postId)
    if(!post) throw new ExistenceError('Post not found.')

    const suggestions = await Suggestion.find({ post: new ObjectId(postId)}).lean()

    suggestions.forEach(suggestion => {
      delete suggestion.post

      suggestion.id = suggestion._id
      delete suggestion._id
    })

    return suggestions
  })()
}
