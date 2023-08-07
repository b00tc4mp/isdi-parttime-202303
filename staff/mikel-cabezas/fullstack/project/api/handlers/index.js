module.exports = {
    registerUserHandler: require('./users/registerUserHandler'),
    retrieveUserHandler: require('./users/retrieveUserHandler'),
    authenticateUserHandler: require('./users/authenticateUserHandler'),
    updateUserNameHandler: require('./users/updateUserNameHandler'),
    updateUserEmailHandler: require('./users/updateUserEmailHandler'),
    updateUserImageHandler: require('./users/updateUserImageHandler'),
    updateUserPasswordHandler: require('./users/updateUserPasswordHandler'),
    addPlaygroundHandler: require('./playgrounds/addPlaygroundHandler'),
    editPlaygroundHandler: require('./playgrounds/editPlaygroundHandler'),
    deletePostHandler: require('./playgrounds/deletePostHandler'),
    retrievePlaygroundsHandler: require('./playgrounds/retrievePlaygroundsHandler'),
    retrieveLikedPostsHandler: require('./playgrounds/retrieveLikedPostsHandler'),
    retrieveSavedPostsHandler: require('./playgrounds/retrieveSavedPostsHandler'),
    retrievePostByPostIdHandler: require('./playgrounds/retrievePostByPostIdHandler'),
    toggleLikePostHandler: require('./playgrounds/toggleLikePostHandler'),
    toggleSavePostHandler: require('./playgrounds/toggleSavePostHandler')
}