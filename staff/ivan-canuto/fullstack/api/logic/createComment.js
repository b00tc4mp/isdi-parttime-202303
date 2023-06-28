const { validators: { validateText } } = require('com')
const { validateId } = require('com/validators')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = (commentText, userId, postId) => {
  validateId(postId, 'post id')
  validateId(userId, 'user id')
  validateText(commentText, 'comment text')

  const { users, posts } = context

  let foundUser;
  return users.findOne({ _id: new ObjectId(userId) })
    .then(user => {
      if(!user) throw new Error('User not found.')
    
      foundUser = user

      return posts.findOne({ _id: new ObjectId(postId) })
    })
    .then(post => {
      if(!post) throw new Error('Post not found.')
      
      let id = 'comment-1'
      const lastComment = post.comments[post.comments.length - 1]
      if (lastComment) id = 'comment-' + (parseInt(lastComment.id.slice(8)) + 1)

      return posts.updateOne(
        { _id: new ObjectId(postId) },
        { $push: { comments: { id: id, author: foundUser.name, authorId: new ObjectId(userId), text: commentText }}}
      )
    })
  
  // readFile(`${process.env.DB_PATH}/users.json`, (error, usersJSON) => {
  //   if(error) {
  //     callBack(error)

  //     return
  //   }

  //   const users = JSON.parse(usersJSON)
  //   const user = users.find(user => user.id === userId)

  //   if(!user) {
  //     callBack(new Error(`User with id ${userId} not found.`))

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
  //       callBack(new Error(`Post with id ${postId} not found.`))

  //       return
  //     }

  //     const postIndex = posts.indexOf(post)

  //     let id = 'comment-1'
  //     const lastComment = post.comments[post.comments.length - 1]
  //     if (lastComment) id = 'comment-' + (parseInt(lastComment.id.slice(8)) + 1)

  //     post.comments.push({
  //       author: user.name,
  //       authorId: user.id,
  //       text: commentText,
  //       id
  //     })

  //     posts.splice(postIndex, 1, post)

  //     const postToJSON = JSON.stringify(posts)

  //     writeFile(`${process.env.DB_PATH}/posts.json`, postToJSON, (error) => {
  //       if(error) {
  //         callBack(new Error(error))

  //         return
  //       }

  //       callBack(null)
  //     })
  //   })
  // })
}