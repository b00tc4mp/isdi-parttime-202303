module.exports = {
    helloApiController: require('./users/helloApiController'),
    registerUserController: require('./users/registerUserController'),
    retrieveUserController: require('./users/retrieveUserController'),
    authenticateUserController: require('./users/authenticateUserController'),
    updateUserNameController: require('./users/updateUserNameController'),
    updateUserEmailController: require('./users/updateUserEmailController'),
    updateUserImageController: require('./users/updateUserImageController'),
    updateUserPasswordController: require('./users/updateUserPasswordController'),
    createPostController: require('./posts/createPostController'),
    editPostController: require('./posts/editPostController'),
    deletePostController: require('./posts/deletePostController'),
    retrievePostsController: require('./posts/retrievePostsController'),
    retrieveLikedPostsController: require('./posts/retrieveLikedPostsController'),
    retrieveSavedPostsController: require('./posts/retrieveSavedPostsController'),
    retrievePostByPostIdController: require('./posts/retrievePostByPostIdController'),
    toggleLikePostController: require('./posts/toggleLikePostController'),
    toggleSavePostController: require('./posts/toggleSavePostController')
}