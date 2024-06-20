const deletePost = require('../deletePost')

deletePost('user-1', 'post-2', error => {
    if(error){
        console.error(error)
        return
    }

    console.log('post deleted!')
})

