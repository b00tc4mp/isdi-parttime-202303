const updatePost = require('./updatePost')

updatePost('user-1','user-1-1685621737814','https://cdn.geekwire.com/wp-content/uploads/2011/04/clippy.jpg','Parece que estás intentando modificar un Post', error => {
    if (error) {
        console.error(error)

        return
    }
})