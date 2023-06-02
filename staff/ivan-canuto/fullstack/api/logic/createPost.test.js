const createPost = require('./createPost')

createPost('user-1', 'https://hola.y.adios.com', 'Hola don Pepito.', (error) => {
  if(error) {
    console.error(error)

    return
  }

  console.log('Created post.')
})