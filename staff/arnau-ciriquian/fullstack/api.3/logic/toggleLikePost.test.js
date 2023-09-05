import toggleLikePost from "./toggleLikePost.js"

toggleLikePost('user-4', 'post-3', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post like toggled')
})