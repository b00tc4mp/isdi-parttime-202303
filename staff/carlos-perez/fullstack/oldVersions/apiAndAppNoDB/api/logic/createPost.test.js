const createPost = require('./createPost')

createPost('user-1','https://cdn.geekwire.com/wp-content/uploads/2011/04/clippy.jpg','Parece que estás intentando crear un Post', error => {
    if (error) {
        console.error(error)

        return
    }
})