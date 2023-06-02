const deleteComment = require('./deleteComment')

deleteComment('post-1', 'comment-2', (error) => {
  if(error) {
    console.error(error)

    return
  }

  console.log('Comment deleted.')
})