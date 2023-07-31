module.exports = {
    authenticateUserHandler: require('./users/authenticateUserHandler'),
    registerUserHandler: require('./users/registerUserHandler'),
    retrieveUserHandler: require('./users/retrieveUserHandler'),    
    updateUserAvatarHandler: require('./users/updateUserAvatarHandler'),
    updateUserModeHandler: require('./users/updateUserModeHandler'),
    updateUserPasswordHandler: require('./users/updateUserPasswordHandler'),
    addUserContactHandler: require('./users/addUserContactHandler'),
    deleteUserContactHandler: require('./users/deleteUserContactHandler'),
    searchUser: require('./users/searchUser'),

    createListHandler: require('./lists/createListHandler'),
    addUsersToNotifyAcceptListHandler: require('./lists/addUsersToNotifyAcceptListHandler'),
    reviewListsToNotifyAcceptHandler: require('./lists/reviewListsInvitedHandler'),
    acceptListByUserHandler: require('./lists/acceptListByUserHandler'),
    reviewListsAccectedByUserHandler: require('./lists/reviewListsGuestHandler'),

    addMessageHandler: require('./lists/messages/addMessage'),
    reviewMessagesHandler: require('./lists/messages/reviewMessagesHandler'),

    addStoreHandler: require('./lists/messages/addStoreHandler'),
    reviewStoresHandler: require('./lists/messages/reviewStoresHandler')
}