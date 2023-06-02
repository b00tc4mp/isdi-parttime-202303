const retrieveUserPosts = require('./retrieveUserPosts')

retrieveUserPosts('user-1', (error, userPosts) => {
  if(error) {
    console.error(error)

    return
  }

  console.log(userPosts)
})