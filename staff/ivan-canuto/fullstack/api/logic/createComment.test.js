const createComment = require('./createComment')

createComment('Vaya foto!', 'user-1', 'post-1', (error) => {
  if(error) {
    console.error(error)

    return
  }

  console.log('Comment created.')
})