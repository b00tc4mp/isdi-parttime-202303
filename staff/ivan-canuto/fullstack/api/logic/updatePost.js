const { validators: { validateId, validateUrl, validateText } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = (userId, postId, imageUrl, postText) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateUrl(imageUrl,'image url')
  validateText(postText, 'post text')

  const { users, posts } = context

  return users.findOne({ _id: new ObjectId(userId) })
    .then(user => {
      if(!user) throw new Error('User not found.')

      return posts.findOne({ _id: new ObjectId(postId) })
    })
    .then(post => {
      if(!post) throw new Error('Post not found.')

      if (post.author.toString() !== userId) throw new Error('There must be an error, this user is not the owner of the post.')

      return posts.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { 
          image: imageUrl,
          text: postText
        }}
      )
    })

  // readFile(`${process.env.DB_PATH}/users.json`, (error, usersJSON) => {
  //   if(error) {
  //     callBack(error)

  //     return
  //   }

  //   const users = JSON.parse(usersJSON)
  //   const user = users.find(user => user.id === userId)

  //   if (!user) {
  //     callBack(new Error(`User not found.`))
      
  //     return
  //   }
    
  //   readFile(`${process.env.DB_PATH}/posts.json`, (error, postsJSON) => {
  //     if(error) {
  //       callBack(error)
  
  //       return
  //     }

  //     const posts = JSON.parse(postsJSON)
  //     const post = posts.find(post => post.id === postId)

  //     if (!post) {
  //       callBack(new Error(`Post with id ${postId} not found.`))

  //       return
  //     }
    
  //     if (post.author !== userId) {
  //       callBack(new Error('There must be an error, this user is not the owner of the post.'))

  //       return
  //     }
    
  //     post.text = postText
  //     post.image = imageUrl
    
  //     const postIndex = posts.findIndex(_post => _post.id === postId)

  //     posts.splice(postIndex, 1, post)
  //     const postsToJSON = JSON.stringify(posts)

  //     writeFile(`${process.env.DB_PATH}/posts.json`, postsToJSON, (error) => {
  //       if(error) {
  //         callBack(error)

  //         return
  //       }

  //       callBack(null)
  //     })
  //   })
  // })
}