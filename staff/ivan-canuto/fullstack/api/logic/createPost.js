const { readFile, writeFile } = require('fs')
const { validators: { validateCallback, validateText, validateUrl, validateId } } = require('com')
require('dotenv').config()

module.exports = ( userId, imageUrl, postText, callBack) => {
  validateId(userId, 'user id')
  validateUrl(imageUrl)
  validateText(postText)
  validateCallback(callBack)

  readFile(`${process.env.DB_PATH}/users.json`, (error, usersJSON) => {
    if(error) {
      callBack(error)
      
      return
    }

    const users = JSON.parse(usersJSON)

    const user = users.find(_user => _user.id === userId)

    readFile(`${process.env.DB_PATH}/posts.json`, (error, postsJSON) => {
      if(error) {
        callBack(error)
        
        return
      }

      const posts = JSON.parse(postsJSON)
      
      let id = 'post-1'
      const lastPost = posts[posts.length - 1]
      if (lastPost) id = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)

      let date = new Date()

      const post = {
        id,
        author: user.id,
        image: imageUrl,
        text: postText,
        date: date.toLocaleDateString(),
        likes: [],
        visible: true,
        onSale: null,
        comments: []
      }

      posts.push(post)

      const newPostsJSON = JSON.stringify(posts)

      writeFile(`${process.env.DB_PATH}/posts.json`, newPostsJSON, (error) => {
        if(error) {
          callBack(error)

          return
        }

        callBack(null)
      })
    })
  })
}