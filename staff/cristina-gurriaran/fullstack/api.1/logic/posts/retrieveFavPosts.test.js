const retrieveFavPosts = require('./retrieveFavPosts')

retrieveFavPosts('user-1', (error, posts) => {
    if(error){
        console.error(error)
        return
    }

    console.log(posts)
    console.log('fav posts retreived')
})