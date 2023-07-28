module.exports = {
    authenticateUser: require('./users/authenticateUser'),
    registerUser: require('./users/registerUser'),
    retrieveUser: require('./users/retrieveUser'),    
    updateUserAvatar: require('./users/updateUserAvatar'),
    updateUserMode: require('./users/updateUserMode'),
    updateUserPassword: require('./users/updateUserPassword'),
    addUserContact: require('./users/addUserContact'),
    deleteUserContact: require('./users/deleteUserContact'),

    createList: require('./lists/createList'),
    addUsersToNotifyAcceptList: require('./lists/addUsersToNotifyAcceptList'),
    reviewListsToNotifyAccept: require('./lists/reviewListsToNotifyAccept'),
    acceptListByUser: require('./lists/acceptListByUser'),
    reviewListsAccectedByUser: require('./lists/reviewListsAccectedByUser')
}