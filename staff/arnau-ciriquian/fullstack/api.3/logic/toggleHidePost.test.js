import toggleHidePost from "./toggleHidePost.js"

toggleHidePost('user-1', 'post-3', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post hide toggled')
})