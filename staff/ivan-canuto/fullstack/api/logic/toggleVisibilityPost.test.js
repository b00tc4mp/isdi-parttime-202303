const toggleVisibilityPost = require('./toggleVisibilityPost')

toggleVisibilityPost('post-1', (error) => {
  if(error) {
    console.error(error)

    return
  }

  console.log('Post visibility toggled.')
})