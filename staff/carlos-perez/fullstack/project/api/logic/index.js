module.exports = {
  registerAdmin: require('./administrator/registerAdmin'),
  authenticateAdmin: require('./administrator/authenticateAdmin'),
  updateAdminEmail: require('./administrator/updateAdminEmail'),
  updateAdminPassword: require('./administrator/updateAdminPassword'),
  deleteAdmin: require('./administrator/deleteAdmin'),
  createUpdate: require('./update/createUpdate'),
  modifyUpdate: require('./update/modifyUpdate'),
  deleteUpdate: require('./update/deleteUpdate'),
  toggleUpdateVisibility: require('./update/toggleUpdateVisibility'),
  createEvent: require('./event/createEvent'),
  modifyEvent: require('./event/modifyEvent'),
  deleteEvent: require('./event/deleteEvent'),
  toggleEventVisibility: require('./event/toggleEventVisibility'),
  createLyricPost: require('./lyricPost/createLyricPost')
}