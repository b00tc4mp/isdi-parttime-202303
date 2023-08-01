module.exports = {
    registerUserHandler: require('./users/registerUserHandler'),
    retrieveUserHandler: require('./users/retrieveUserHandler'),
    authenticateUserHandler: require('./users/authenticateUserHandler'),
    updateUserNameHandler: require('./users/updateUserNameHandler'),
    updateUserEmailHandler: require('./users/updateUserEmailHandler'),
    updateUserImageHandler: require('./users/updateUserImageHandler'),
    updateUserPasswordHandler: require('./users/updateUserPasswordHandler'),
    createPostHandler: require('./posts/createPostHandler'),
    editPostHandler: require('./posts/editPostHandler'),
    deletePostHandler: require('./posts/deletePostHandler'),
    retrievePlaygroundsHandler: require('./posts/retrievePlaygroundsHandler'),
    retrieveLikedPostsHandler: require('./posts/retrieveLikedPostsHandler'),
    retrieveSavedPostsHandler: require('./posts/retrieveSavedPostsHandler'),
    retrievePostByPostIdHandler: require('./posts/retrievePostByPostIdHandler'),
    toggleLikePostHandler: require('./posts/toggleLikePostHandler'),
    toggleSavePostHandler: require('./posts/toggleSavePostHandler')
}