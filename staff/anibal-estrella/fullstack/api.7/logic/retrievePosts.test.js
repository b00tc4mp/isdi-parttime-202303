const retrievePosts = require('./retrievePosts')

retrievePosts('user-1', (error, post) => {
    if (error) {
        console.log(error);

        return
    }

    console.log(post);
})