module.exports = {
    registerUserHandler: require('./registerUserHandler'),
    authenticateUserHandler: require('./authenticateUserHandler'),
    retrieveUserHandler: require('./retrieveUserHandler'),
    updateUserAvatarHandler: require('./updateUserAvatarHandler'),
    updateUserPasswordHandler: require('./updateUserPasswordHandler'),
    createWorkspotHandler: require('./createWorkspotHandler'),
    retrieveWorkspotsHandler: require('./retrieveWorkspotsHandler'),
    getWorkspotsByNameHandler: require('./getWorkspotsByNameHandler'),
    getFilteredWorkspots: require('./getFilteredWorkspotsHandler'),
    retrieveWorkspotHandler : require('./retrieveWorkspotHandler'),
    updateWorkspotHandler : require('./updateWorkspotHandler'),
    deleteWorkspotHandler: require('./deleteWorkspotHandler'),
    toggleLikeWorkspotHandler: require('./toggleLikeWorkspotHandler'),
    toggleFavWorkspotHandler: require('./toggleFavWorkspotHandler')

}