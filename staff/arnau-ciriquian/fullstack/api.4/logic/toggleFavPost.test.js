import toggleFavPost from "./toggleFavPost.js"

toggleFavPost('user-3', 'post-2', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('fav toggled')
})