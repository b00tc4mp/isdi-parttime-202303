const toggleLikePost = require('../toggleLikePost')

toggleLikePost("user-1", "post-2", error => {
    if(error){
        console.error(error)

        return
    }

    console.log("post liked or unliked!")
})