module.exports = {
    authenticateUser: require('./users/authenticateUser'),
    registerUser: require('./users/registerUser'),
    retrieveUser: require('./users/retrieveUser'),    
    updateUserAvatar: require('./users/updateUserAvatar'),
    updateUserMode: require('./users/updateUserMode'),
    updateUserPassword: require('./users/updateUserPassword'),
    addUserContact: require('./users/addUserContact'),
    deleteUserContact: require('./users/deleteUserContact'),
    retrieveUserContacts: require('./users/retrieveUserContacts'),  
    searchUser: require('./users/searchUser'),  

    createList: require('./lists/createList'),
    addUsersToInvitedList: require('./lists/addUsersToInvitedList'),
    reviewListsInvited: require('./lists/reviewListsInvited'),
    acceptGuestList: require('./lists/acceptGuestList'),
    declineGuestList: require('./lists/declineGuestList'),
    reviewListsGuest: require('./lists/reviewListsGuest'),
    copyToNewList: require('./lists/copyToNewList'),

    addMessage: require('./lists/messages/addMessage'),
    reviewMessages: require('./lists/messages/reviewMessages'),

    addStore: require('./lists/stores/addStore'),
    reviewStores: require('./lists/stores/reviewStores'),

    reviewProductTypes: require('./lists/products/reviewProductTypes'),
    addProductToList: require('./lists/products/addProductToList'),
    deleteProductToList: require('./lists/products/deleteProductToList'),
    editProductToList: require('./lists/products/editProductToList'),
    toggleProductToCart: require('./lists/products/toggleProductToCart'),
    markProductAsPurchased: require('./lists/products/markProductAsPurchased'),
    reviewFilteredProducts: require('./lists/products/reviewFilteredProducts')
}