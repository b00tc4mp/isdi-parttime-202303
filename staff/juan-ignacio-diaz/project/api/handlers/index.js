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
    reviewListsToNotifyAcceptHandler: require('./lists/reviewListsToNotifyAcceptHandler'),
    acceptListByUserHandler: require('./lists/acceptListByUserHandler'),
    reviewListsAccectedByUserHandler: require('./lists/reviewListsAccectedByUserHandler'),

    addCommentToChatHandler: require('./lists/chat/addCommentToChat'),
    reviewChatCommentsHandler: require('./lists/chat/reviewChatCommentsHandler')
}