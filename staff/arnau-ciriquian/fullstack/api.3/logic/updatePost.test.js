import { updatePost } from "./updatePost.js"

updatePost('user-1', 'post-3', 'new image', 'new hello world', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post updated')
})