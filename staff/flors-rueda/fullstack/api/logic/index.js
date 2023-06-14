module.exports = {
    authenticateUser: require('./users/authenticateUser'),
    deleteUser: require('./users/deleteUser'),
    registerUser: require('./users/registerUser'),
    retrieveUser: require('./users/retrieveUser'),
    updateAvatar: require('./users/updateAvatar'),
    updateMail: require('./users/updateMail'),
    updateName: require('./users/updateName'),
    updatePassword: require('./users/updatePassword'),
    uploadPost: require('./posts/uploadPost'),//
    updatePost: require('./posts/updatePost'),//
    retrievePost: require('./posts/retrievePost'),//
    retrievePosts: require('./posts/retrievePosts'),
    retrieveFavoritePosts: require('./posts/retrieveFavoritePosts'),
    retrieveUserPosts: require('./posts/retrieveUserPosts'),
    toggleFav: require('./posts/toggleFav'),
    toggleLike: require('./posts/toggleLike'),
    togglePublicStat: require('./posts/togglePublicStat'),
    deletePost: require('./posts/deletePost'),
}