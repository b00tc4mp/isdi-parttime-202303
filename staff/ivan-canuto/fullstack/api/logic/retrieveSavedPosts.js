const { readFile } = require('fs')

module.exports = function retrieveSavedPosts(userId, callBack) {
  

  readFile('./data/users.json', 'utf8', (error, usersJSON) => {
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

    readFile('./data/posts.json', 'utf8', (error, postsJSON) => {
      if(error) {
        callBack(error)
  
        return
      }

      const posts = JSON.parse(postsJSON)
      const savedPosts = posts.filter(post => user.favs.includes(post.id))
      
      savedPosts.forEach(post => {
        
        const _user = users.find(user => user.id === post.author)
        
        if(_user) {
          post.author = {
          id: _user.id,
          name: _user.name,
          avatar: _user.avatar,
          favs: _user.favs
          }
        }
      })

      callBack(null, savedPosts.toReversed())
    })
  })
}