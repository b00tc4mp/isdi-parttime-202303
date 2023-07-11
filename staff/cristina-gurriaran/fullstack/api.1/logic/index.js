module.exports = {
    registerUser: require('./users/registerUser'),
    authenticateUser: require('./users/authenticateUser'),
    retrieveUser: require('./users/retrieveUser'),
    updateUserAvatar: require('./users/updateUserAvatar'),
    updateUserPassword: require('./users/updateUserPassword'),
    retrievePosts: require('./posts/retrievePosts'),
    createPost: require('./posts/createPost'),
    deletePost: require('./posts/deletePost'),
    updatePost: require('./posts/updatePost'),
    retrievePost: require('./posts/retrievePost')

}