const retrieveSavedPosts = require('./retrieveSavedPosts')

retrieveSavedPosts('user-1', (error, savePosts) => {
  if(error) {
    console.error(error)

    return
  }

  console.log(savePosts)
})