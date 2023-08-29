module.exports = {
    registerUser: require('./users/registerUser'),
    authenticateUser: require('./users/authenticateUser'),
    retrieveUser: require('./users/retrieveUser'),
    updateUserAvatar: require('./users/updateUserAvatar'),
    updateUserPassword: require('./users/updateUserPassword'),
    createWorkspot: require('./workspots/createWorkspot'),
    retrieveWorkspots : require('./workspots/retrieveWorkspots'),
    getWorkspotsByName: require('./workspots/getWorkspotsByName'),
    getFilteredWorkspots: require('./workspots/getFilteredWorkspots'),
    retrieveWorkspot: require('./workspots/retrieveWorkspot'),
    updateWorkspot: require('./workspots/updateWorkstpot'),
    deleteWorkspot: require('./workspots/deleteWorkspot'),
    toggleLikeWorkspot: require('./workspots/toggleLikeWorkspot'),
    toggleFavWorkspot: require('./workspots/toggleFavWorkspot'),
    retrieveFavWorkspots: require('./workspots/retrieveFavWorkspots'),
    addReviewToWorkspot: require('./workspots/addReviewToWorkspot')

}