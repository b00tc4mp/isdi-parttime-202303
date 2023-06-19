const authenticateUserMid = require('./authenticateUserMid');

module.exports = {
    helloApiMid: require('./helloApiMid'),
    registerUserMid: require('./registerUserMid'),
    authenticateUserMid: require('./authenticateUserMid'),
    retrieveUserMid: require('./retrieveUserMid'),
    updateUserAvatarMid: require('./updateUserAvatarMid'),
    createPostMid: require('./createPostMid'),
}