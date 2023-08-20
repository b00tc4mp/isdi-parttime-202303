module.exports = {
    registerUser: require('./users/registerUser'),
    authenticateUser: require('./users/authenticateUser'),
    retrieveUser: require('./users/retrieveUser'),
    updateUserAvatar: require('./users/updateUserAvatar'),
    updateUserPassword: require('./users/updateUserPassword'),
    createWorkspot: require('./workspots/createWorkspot'),
    retrieveWorkspots : require('./workspots/retrieveWorkspots'),
    searchWorkspotsByName: require('./workspots/searchWorkspotsByName')

}