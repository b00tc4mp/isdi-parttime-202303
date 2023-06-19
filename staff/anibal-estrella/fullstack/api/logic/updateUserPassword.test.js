const createPost = require('../createPost')

createPost('user-1', 'post-1', (error, post) => {
    if (error) {
        console.log(error);

        return
    }

    console.log(post);
})