const { readFile, writeFile } = require('fs')

module.exports = function createPost( userId, imageUrl, postText, callBack) {


  readFile('./data/users.json', 'utf8', (error, usersJSON) => {
    if(error) {
      callBack(error)
      
      return
    }

    const users = JSON.parse(usersJSON)

    const user = users.find(_user => _user.id === userId)

    readFile('./data/posts.json', 'utf8', (error, postsJSON) => {
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

      writeFile('./data/posts.json', newPostsJSON, 'utf8', (error) => {
        if(error) {
          callBack(error)

          return
        }

        callBack(null)
      })
    })
  })
}