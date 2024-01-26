
module.exports = {
    helloApiHandler: require('./helloApiHandler'),
    registerUserHandler: require('./registerUserHandler'),
    authenticateUserHandler: require('./authenticateUserHandler'),
    retrieveUserHandler: require('./retrieveUserHandler'),
    updateUserAvatarHandler: require('./updateUserAvatarHandler'),
    updateUserPasswordHandler: require('./updateUserPasswordHandler'),
    createPostHandler: require('./createPostHandler'),
    retrievePostHandler: require('./retrievePostHandler'),
    retrievePostsHandler: require('./retrievePostsHandler'),
    updatePostHandler: require('./updatePostHandler'),
    toggleFavPostHandler: require('./toggleFavPostHandler'),
    toggleLikePostHandler: require('./toggleLikePostHandler'),
    deletePostHandler: require('./deletePostHandler'),
    addCommentToPostHandler: require('./addCommentToPostHandler'),
    removeCommentFromPostHandler: require('./removeCommentFromPostHandler')
}