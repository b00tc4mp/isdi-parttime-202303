module.exports = {
    authenticateUserHandler: require('./users/authenticateUserHandler'),
    registerUserHandler: require('./users/registerUserHandler'),
    retrieveUserHandler: require('./users/retrieveUserHandler'),    
    updateUserAvatarHandler: require('./users/updateUserAvatarHandler'),
    updateUserModeHandler: require('./users/updateUserModeHandler'),
    updateUserPasswordHandler: require('./users/updateUserPasswordHandler'),
    addUserContactHandler: require('./users/addUserContactHandler'),
    deleteUserContactHandler: require('./users/deleteUserContactHandler'),
    searchUserHandler: require('./users/searchUserHandler'),

    createListHandler: require('./lists/createListHandler'),
    addUsersToInvitedListHandler: require('./lists/addUsersToInvitedListHandler'),
    reviewListsInvitedHandler: require('./lists/reviewListsInvitedHandler'),
    acceptGuestListHandler: require('./lists/acceptGuestListHandler'),
    declineGuestListHandler: require('./lists/declineGuestListHandler'),
    reviewListsGuestHandler: require('./lists/reviewListsGuestHandler'),

    addMessageHandler: require('./lists/messages/addMessageHandler'),
    reviewMessagesHandler: require('./lists/messages/reviewMessagesHandler'),

    addStoreHandler: require('./lists/stores/addStoreHandler'),
    reviewStoresHandler: require('./lists/stores/reviewStoresHandler')
}