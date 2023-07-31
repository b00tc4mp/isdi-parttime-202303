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
    addUsersToInvitedList: require('./lists/addUsersToInvitedList'),
    reviewListsToNotifyAccept: require('./lists/reviewListsInvited'),
    acceptInvitedList: require('./lists/acceptGuestList'),
    reviewListsGuest: require('./lists/reviewListsGuest'),

    addMessage: require('./lists/messages/addMessage'),
    reviewMessages: require('./lists/messages/reviewMessages'),

    addStore: require('./lists/stores/addStore'),
    reviewStores: require('./lists/stores/reviewStores')
}