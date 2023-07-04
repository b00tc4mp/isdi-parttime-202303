const retrieveLikedPosts = require('./retrieveLikedPosts')


retrieveLikedPosts('user-1', (error, posts) => {
    if (error) {
        console.log(error);

        return
    }

    console.log(posts);
})