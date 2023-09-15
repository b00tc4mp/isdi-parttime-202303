const {
    validators: { validateId, validateText },
    errors: { ExistenceError }
  } = require('com')
  const { User, Post } = require('../data/models')

  /**
 * Retrieves the posts matching the user search
 * 
 * @param {string} userId The user id
 * @param {string} textToSearch The text used for searching posts
 * 
 * @returns {Promise<array>} The array of posts
 * 
 * @throws {TypeError} On non-string user id or text to search
 * @throws {ContentError} On user id not equal to 24 characters of length or not hexadecimal, or empty text to search
 * @throws {ExistenceError} On non-existing user
 */
  
  module.exports = (userId, postSubject, textToSearch) => {
    validateId(userId, 'user id')
    validateText(postSubject, 'subject')
    validateText(textToSearch, 'text to search')
  
    return (async () => {
      const user = await User.findById(userId)
      if(!user) throw new ExistenceError('User not found.')

      let posts

      if(postSubject === 'Show all posts')
        posts = await Post.find({ title: { $regex: textToSearch, $options: 'i' } }).populate('author', 'name avatar').sort({ likes: -1 }).lean()
      else
        posts = await Post.find({ subject: postSubject, title: {$regex: textToSearch, $options: 'i'} }).populate('author', 'name avatar').sort({ likes: -1 }).lean()
  
      posts.forEach(post => {
        post.id = post._id.toString()
        delete post._id
  
        post.fav = user.favs.some(fav => fav.toString() === post.id)
        post.liked = post.likes.some(like => like.toString() === user.id)
  
        if(post.author._id) {
          post.author.id = post.author._id.toString()
          delete post.author._id
        }
      })
  
      return posts
    })()
  }