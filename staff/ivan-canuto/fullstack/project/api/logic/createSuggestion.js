const { validators: { validateText, validateId } } = require('com')
const { errors: { ExistenceError, ContentError } } = require('com')

const { User, Post, Suggestion } = require('../data/models')

module.exports = (userId, postId, title, content) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateText(title, 'suggestion title')
  validateText(content, 'suggestion text')

  if(title.length > 30) throw new ContentError('The title of the suggestion is too long.')
  if(content.length < 50) throw new ContentError('The content of the suggestion is too short.')
  if(content.length > 500) throw new ContentError('The content of the suggestion is too long.')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError(`User not found.`)

    const post = await Post.findById(postId)
    if(!post) throw new ExistenceError(`Post not found.`)

    await Suggestion.create({
      author: user._id,
      post: post._id,
      postAuthor: post.author,
      title,
      content
    })

    // Mirar si mongoose guarda estos ids como ObjectId en el caso de que sean strings
  })()
}