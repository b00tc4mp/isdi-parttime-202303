const updatePost = require('./updatePost')

updatePost('user-1', 'post-2', 'ImagenURL', 'Vaya foto', (error) => {
  if(error) {
    console.error(error)

    return
  }

  console.log('Updated post.')
})