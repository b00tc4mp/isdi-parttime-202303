const { validators: { validateId } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = (postId, userId) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')

  const { users, posts } = context

  return users.findOne({ _id: new ObjectId(userId) })
    .then(user => {
      if(!user) throw new Error('User not found.')

      return posts.findOne({ _id: new ObjectId(postId) })
    })
    .then(post => {
      if(!post) throw new Error('Post not found.')

      return posts.deleteOne({ _id: new ObjectId(postId) })
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
  //     const postIndex = posts.findIndex(_post => _post.id === postId)

  //     if(postIndex === -1) {
  //       callBack(new Error('Post not found.'))

  //       return
  //     }
        
  //     const favPostIndex = user.favs.indexOf(postId)
      
  //     if(favPostIndex !== -1) {
  //       users.favs.splice(favPostIndex, 1)
  //       const usersToJSON = JSON.stringify(users)

  //       writeFile(`${process.env.DB_PATH}/users.json`, usersToJSON, (error) => {
  //         if(error) {
  //           callBack(error)

  //           return
  //         }
  //       })
  //     }
  //     else if(favPostIndex === -1) {
  //       const usersToJSON = JSON.stringify(users)
  //       writeFile(`${process.env.DB_PATH}/users.json`, usersToJSON, (error) => {
  //         if(error) {
  //           callBack(error)

  //           return
  //         }
  //       })
  //     }

  //     posts.splice(postIndex, 1)

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