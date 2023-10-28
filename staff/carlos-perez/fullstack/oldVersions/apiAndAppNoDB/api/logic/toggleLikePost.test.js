const toggleLikePost = require('./toggleLikePost')

toggleLikePost('user-1','user-2-1685098291599', (error, user) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(user)
})