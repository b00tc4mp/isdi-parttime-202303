module.exports = {
    helloApiHandler: require('./helloApiHandler'),
    authenticateAdminHandler: require('./administrator/authenticateAdminHandler'),
    registerAdminHandler: require('./administrator/registerAdminHandler'),
    updateAdminEmailHandler: require('./administrator/updateAdminEmailHandler'),
    updateAdminPasswordHandler: require('./administrator/updateAdminPasswordHandler'),
    deleteAdminHandler: require('./administrator/deleteAdminHandler'),
    createUpdateHandler: require('./update/createUpdateHandler'),
    modifyUpdateHandler: require('./update/modifyUpdateHandler'),
    deleteUpdateHandler: require('./update/deleteUpdateHandler'),
    toggleUpdateVisibilityHandler: require('./update/toggleUpdateVisibilityHandler')
  }