const buyPost = require('./buyPost.js')

buyPost('post-1', (error) => {
  if(error) {
    console.error(error)

    return
  }

  console.log('Sold post.')
})