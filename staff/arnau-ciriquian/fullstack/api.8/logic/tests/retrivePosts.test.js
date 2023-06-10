const retrivePosts = require("./retrivePosts.js")

retrivePosts('user-2', (error, posts) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(posts)
})