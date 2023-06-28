const { validators: { validateId } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = (postId) => {
  validateId(postId, 'post id')
  
  const { posts } = context

  return posts.findOne({ _id: new ObjectId(postId) })
    .then(post => {
      if(!post) throw new Error(`Post with id ${postId} not found.`)
      
      if(!post.onSale) throw new Error('This post is not on sale.')

      if(post.onSale === 'Sold') throw new Error('This post is already sold.')

      return posts.updateOne(
        { _id: new ObjectId(postId) },
        { $set : { onSale: 'Sold' } }
      )
    })

  // readFile(`${process.env.DB_PATH}/posts.json`, (error, postsJSON) => {
  //   if(error) {
  //     callBack(error)

  //     return
  //   }

  //   const posts = JSON.parse(postsJSON)

  //   const post = posts.find(_post => _post.id === postId)

  //   if(!post) {
  //     callBack(new Error(`Post with id ${postId} not found.`))

  //     return
  //   }
  //   else if(!post.onSale) {
  //     callBack(new Error('This post is not on sale.'))

  //     return
  //   }
  //   else if(post.onSale === 'Sold') {
  //     callBack(new Error('This post is already sold.'))

  //     return
  //   }
    
  //   const postIndex = posts.indexOf(post)
    
  //   post.onSale = 'Sold'

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