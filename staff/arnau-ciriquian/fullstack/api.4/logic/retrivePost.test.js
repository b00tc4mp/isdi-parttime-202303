import retrivePost from "./retrivePost.js"

retrivePost('user-3', 'post-2', (error, post) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(post)
})