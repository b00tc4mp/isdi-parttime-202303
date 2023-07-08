const updatePost = require('../updatePost')

updatePost('user-1', 'post-2', 'https://biotrendies.com/wp-content/uploads/2015/06/manzana-1200x900.jpg', 'updated post!', error => {
    if(error){
        console.error(error)

        return
    }

    console.log('post updated!')
})