const deletePost = require('./deletePost')

deletePost('user-1','user-1-1685621737814', error => {
    if (error) {
        console.error(error)

        return
    }
})