const retrievePost = require('../retrievePost')

retrievePost("user-1", "post-2", (error, post) => {
    if(error){
        console.error(error)

        return
    }

    console.log(post)
})