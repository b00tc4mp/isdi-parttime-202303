const updatePost = require('./updatePost')

updatePost('user-1','post-1','image','BCN','POST UPDATED','text', error => {
    if(error){
        console.error(error)
        return
    }
    console.log('post succesfully updated')
})