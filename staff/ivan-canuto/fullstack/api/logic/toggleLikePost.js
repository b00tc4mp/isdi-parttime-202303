const { readFile, writeFile } = require('fs')
const { validators: { validateId, validateCallback } } = require('com')

module.exports = (userId, postId, callBack) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateCallback(callBack)

  readFile(`${process.env.DB_PATH}/users.json`, (error, usersJSON) => {
    if(error) {
      callBack(error)

      return
    }

    const users = JSON.parse(usersJSON)
    const user = users.find(user => user.id === userId)

    if(!user) {
      callBack(new Error('User not found.'))

      return
    }

    readFile(`${process.env.DB_PATH}/posts.json`, (error, postsJSON) => {
      if(error) {
        callBack(error)

        return
      }

      const posts = JSON.parse(postsJSON)
      const post = posts.find(post => post.id === postId)

      if(!post) {
        callBack(new Error('Post not found.'))

        return
      }

      // const userPost = Array.from(document.querySelectorAll('.user-post')).find(_post => _post.id === post.id)
      // if(!userPost) callBack(new Error('Post not found'))

      // const likesPost = userPost.querySelector('.likes-post')
      // const likedPost = post.likes.some(id => id === userId)
      // const likeIcon = userPost.querySelector('.heart-icon')
    
      if (!post.likes.some(id => id === userId)) {
        // likeIcon.querySelector('span').classList.add('liked', 'filled')
        // likesPost.textContent = (parseInt(likesPost.textContent[0]) + 1) + ' likes'
        post.likes.push(userId)

      } else {
        // likeIcon.querySelector('span').classList.remove('liked', 'filled')
        // likesPost.textContent = (parseInt(likesPost.textContent[0]) - 1) + ' likes'
        let indexUserId = post.likes.indexOf(userId)
        post.likes.splice(indexUserId, 1)
      }
      
      const postIndex = posts.findIndex(_post => _post.id === post.id)

      posts.splice(postIndex, 1, post)
      const postsToJSON = JSON.stringify(posts)

      writeFile(`${process.env.DB_PATH}/posts.json`, postsToJSON, (error) => {
        if(error) {
          callBack(error)

          return
        }

        callBack(null)
      })
    })
  })
}