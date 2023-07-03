const jwt = require('jsonwebtoken')

module.exports = {
    helloApiHandler: require('./helloApiHandler'),
    registerUserHandler: require('./registerUserHandler'),
    authenticateUserHandler: require('./authenticateUserHandler'),
    retrieveUserHandler: require('./retrieveUserHandler'),
    createPostHandler: require('./createPostHandler'),
    retrievePostHandler: require('./retrievePostHandler'),
    retrievePostsHandler: require('./retrievePostsHandler'),
    updateUserPasswordHandler: require('./updateUserPasswordHandler'),
    updateUserAvatarHandler: require('./updateUserAvatarHandler'),
    updateUserEmailHandler: require('./updateUserEmailHandler'),
    deletePostHandler: require('./deletePostHandler'),
    updatePostHandler: require('./updatePostHandler'),
    toggleLikePostHandler: require('./toggleLikePostsHandler'),
    retrieveLikedPostsHandler: require('./retrieveLikedPostsHandler')
}