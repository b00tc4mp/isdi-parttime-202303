const { validators: { validateId, validateText } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = (postId, postPrice) => {
  validateId(postId, 'post id')
  validateText(postPrice, 'post price')

  const { posts } = context
  
  return posts.findOne({ _id: new ObjectId(postId) })
    .then(post => {
      if(!post) throw new Error('Post not found.')

      return posts.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { onSale: postPrice }}
      )
    })

  // readFile(`${process.env.DB_PATH}/posts.json`, (error, postsJSON) => {
  //   if(error) {
  //     callBack(error)
      
  //     return
  //   }

  //   const posts = JSON.parse(postsJSON)
  //   const post = posts.find(post => post.id === postId)

  //   if(!post) {
  //     callBack(new Error('Post not found.'))

  //     return
  //   }

  //   post.onSale = postPrice

  //   const postIndex = posts.findIndex(post => post.id === postId)

  //   posts.splice(postIndex, 1, post)
  //   const postsToJSON = JSON.stringify(posts)

  //   writeFile(`${process.env.DB_PATH}/posts.json`, postsToJSON, (error) => {
  //     if(error) {
  //       callBack(error)

  //       return
  //     }

  //     callBack(null)
  //   })
  // })
}