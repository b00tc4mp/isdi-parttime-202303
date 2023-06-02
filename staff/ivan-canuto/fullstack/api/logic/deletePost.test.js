const deletePost = require('./deletePost')

deletePost('post-1', 'user-1', (error) => {
  if(error) {
    console.error(error)

    return
  }

  console.log('Deleted post.')
})