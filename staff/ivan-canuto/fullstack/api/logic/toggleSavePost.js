const { readFile, writeFile } = require('fs')
const { validators: { validateId, validateText, validateCallback } } = require('com')

module.exports = function toggleSavePost(userId, postId, callBack) {
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

    if (!user) {
      callBack(new Error(`User not found.`))
      
      return
    }
      
    // const userPost = Array.from(document.querySelectorAll('.user-post')).find(_post => _post.id === post.id)
    // const favIcon = userPost.querySelector('.favorite-icon')
    
    if(!user.favs.includes(postId)) {
      // favIcon.querySelector('span').classList.add('saved', 'filled')
      user.favs.push(postId)
    } else {
      // favIcon.querySelector('span').classList.remove('saved', 'filled')
      const indexIcon = user.favs.indexOf(postId)
      user.favs.splice(indexIcon, 1)
    }

    const usersIndex = users.findIndex(user => user.id === userId)

    users.splice(usersIndex, 1, user)
    const usersToJSON = JSON.stringify(users)

    writeFile(`${process.env.DB_PATH}/users.json`, usersToJSON, (error) => {
      if(error) {
        callBack(error)

        return
      }

      callBack(null)
    })      
  })
}