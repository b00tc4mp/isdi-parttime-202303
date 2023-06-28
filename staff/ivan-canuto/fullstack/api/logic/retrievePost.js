const { validators: { validateId } } = require('com')
const { readFile } = require('fs')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = (userId, postId) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')

  const { users, posts } = context

  let foundUser

  return users.findOne({ _id: new ObjectId(userId) })
    .then(user => {
      if(!user) throw new Error('User not found.')

      foundUser = user

      return posts.findOne({ _id: new ObjectId(postId) })
    })
    .then(post => {
      if(!post) throw new Error('Post not found.')

      post.author = {
        id: foundUser.id,
        name: foundUser.name,
        avatar: foundUser.avatar,
        favs: foundUser.favs,
      }

      return post
    })

  // readFile(`${process.env.DB_PATH}/users.json`, (error, usersJSON) => {
  //   if(error) {
  //     callBack(error)

  //     return
  //   }

  //   const users = JSON.parse(usersJSON)
  //   const user = users.find(user => user.id === userId)
    
  //   if(!user) {
  //     callBack(new Error('User not found.'))

  //     return
  //   }

  //   readFile(`${process.env.DB_PATH}/posts.json`, (error, postsJSON) => {
  //     if(error) {
  //       callBack(error)

  //       return
  //     }
  //     const posts = JSON.parse(postsJSON)
  //     const post = posts.find(post => post.id === postId)

  //     if(!post) {
  //       callBack(new Error('Post not found.'))

  //       return
  //     }

  //     const author = users.find(user => user.id === post.author)
        
  //     post.author = {
  //       id: author.id,
  //       name: author.name,
  //       avatar: author.avatar,
  //       favs: author.favs,
  //     }
      
  //     callBack(null, post)
  //   })
  // })
}