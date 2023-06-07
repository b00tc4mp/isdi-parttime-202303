const { readFile } = require('fs')
const { validators: { validateId, validateCallback } } = require('com')

module.exports = function retrievePosts(userId, callBack) {
  validateId(userId, 'user id')
  validateCallback(callBack)

  readFile('./data/users.json', (error, usersJSON) => {
    if(error) {
      callBack(error)

      return
    }

    const users = JSON.parse(usersJSON)
    const user = users.find(_user => _user.id === userId)
    
    if(!user) {
      callBack(new Error('User not found.'))

      return
    }

    readFile('./data/posts.json', (error, postsJSON) => {
      if(error) {
        callBack(error)

        return
      }

      const posts = JSON.stringify(postsJSON)

      posts.forEach(post => {

        const _user = users.find(user => user.id === post.author)
          
        post.author = {
          id: _user.id,
          name: _user.name,
          avatar: _user.avatar,
          favs: _user.favs
        }
      })

      const version=parseInt(versionDetection());

      if(version >=20){
        callBack(null, posts.toReversed()); //Sólo funciona con Node v20 en adelante
      }
      else{
        const reversedPosts=[];
        for(let i=posts.length-1; i>=0; i--){
            reversedPosts.push(posts[i]);
        }
        callBack(null, reversedPosts);
      }
    })
  })
}
