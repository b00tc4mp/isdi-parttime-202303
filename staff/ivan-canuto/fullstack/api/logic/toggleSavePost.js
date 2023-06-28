const { validators: { validateId } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = (userId, postId) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')

  const { users } = context

  return users.findOne({ _id: new ObjectId(userId) })
    .then(user => {
      if(!user) throw new Error('User not found.')

      if(user.favs.includes(postId))
        return users.updateOne(
          { _id: new ObjectId(userId) },
          { $pull: { favs: postId }}
        )
      else
      return users.updateOne(
        { _id: new ObjectId(userId) },
        { $push: { favs: postId }}
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
      
  //   // const userPost = Array.from(document.querySelectorAll('.user-post')).find(_post => _post.id === post.id)
  //   // const favIcon = userPost.querySelector('.favorite-icon')
    
  //   if(!user.favs.includes(postId)) {
  //     // favIcon.querySelector('span').classList.add('saved', 'filled')
  //     user.favs.push(postId)
  //   } else {
  //     // favIcon.querySelector('span').classList.remove('saved', 'filled')
  //     const indexIcon = user.favs.indexOf(postId)
  //     user.favs.splice(indexIcon, 1)
  //   }

  //   const usersIndex = users.findIndex(user => user.id === userId)

  //   users.splice(usersIndex, 1, user)
  //   const usersToJSON = JSON.stringify(users)

  //   writeFile(`${process.env.DB_PATH}/users.json`, usersToJSON, (error) => {
  //     if(error) {
  //       callBack(error)

  //       return
  //     }

  //     callBack(null)
  //   })      
  // })
}