const { validators: { validateId } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = (userId) => {
  validateId(userId, 'user id')

  const { users, posts } = context

  return users.findOne({ _id: new ObjectId(userId) })
    .then(user => {
      if(!user) throw new Error('User not found.')

      return posts.find().toArray()
        .then(posts => {
          const authors = posts.reduce((authors, { author }) => authors.add(author.toString()), new Set)
          
          return users.find({ _id: { $in: Array.from(authors).map(id => new ObjectId(id))}}).toArray()
            .then(users => {
              posts.forEach(post => {
                const user = users.find(_user => _user._id.toString() === post.author.toString())

                post.author = {
                  id: user._id,
                  name: user.name,
                  avatar: user.avatar,
                  favs: user.favs
                }
              })

              return posts.reverse()
            })
        })
    })
      //     return {
    //       ...post,
    //       author: {
    //         _id: new ObjectId(userId),
    //         name: foundUser.name,
    //         avatar: foundUser.avatar,
    //         favs: foundUser.favs
    //       }
    //     }
    //   })
    // return newPosts
      
    // const newPosts = posts.map(post => post.author = {
    //   _id: new ObjectId(userId),
    //   name: user.name,
    //   avatar: user.avatar,
    //   favs: user.favs
    // })

    // return newPosts.reverse()

  // readFile(`${process.env.DB_PATH}/users.json`, (error, usersJSON) => {
  //   if(error) {
  //     callBack(error)

  //     return
  //   }

  //   const users = JSON.parse(usersJSON)
  //   const user = users.find(_user => _user.id === userId)
    
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

  //     posts.forEach(post => {

  //       const _user = users.find(user => user.id === post.author)
          
  //       post.author = {
  //         id: _user.id,
  //         name: _user.name,
  //         avatar: _user.avatar,
  //         favs: _user.favs
  //       }
  //     })
      
  //     callBack(null, posts.reverse());
      
  //   })
  // })
}
