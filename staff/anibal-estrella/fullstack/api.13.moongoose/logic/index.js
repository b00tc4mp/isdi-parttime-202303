module.exports = {
    registerUser: require('./registerUser'),
    authenticateUser: require('./authenticateUser'),
    updateUserPassword: require('./updateUserPassword'),
    updateUserAvatar: require('./updateUserAvatar'),
    createPost: require('./createPost'),
    deletePost: require('./deletePost'),
    updatePost: require('./updatePost'),
    updateUserEmail: require('./updateUserEmail'),
    toggleLikePost: require('./toggleLikePost'),
    toggleFavPost: require('./toggleFavPost'),
    retrievePost: require('./retrievePost'),
    retrievePosts: require('./retrievePosts'),
    retrieveLikedPosts: require('./retrieveLikedPosts'),
    retrieveFavPosts: require('retrieveFavPosts'),
    retrieveUser: require('./retrieveUser')
}