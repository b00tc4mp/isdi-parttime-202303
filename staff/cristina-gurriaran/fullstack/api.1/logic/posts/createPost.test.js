const createPost = require('./createPost')

createPost('user-1', 'imageURL', 'BCN', 'First Post', 'blablabla', error => {
    if(error){
        console.error(error)
        return
    }
    console.log('post succesfully created')
})