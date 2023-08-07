module.exports = {
    createLevel: require('./levels/createLevel'),
    retrieveLevel: require('./levels/retrieveLevel'),
    retrieveLevels: require('./levels/retrieveLevels'),
    registerUser: require('./users/registerUser'),
    authenticateUser: require('./users/authenticateUser'),
    retrieveUser: require('./users/retrieveUser'),
    retrieveUserLogged: require('./users/retrieveUserLogged'),
    updateColor: require('./users/updateColor'),
    updateAvatar: require('./users/updateAvatar'),
    toggleLike: require('./levels/toggleLike'),
    checkRecoveryAnswer: require('./users/checkRecoveryAnswer'),
    recoverPassword: require('./users/recoverPassword'),
    retrieveRandomRecoveryQuestion: require('./users/retrieveRandomRecoveryQuestion'),
    updatePassword: require('./users/updatePassword')
}