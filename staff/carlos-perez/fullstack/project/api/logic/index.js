module.exports = {
  registerAdmin: require('./administrator/registerAdmin'),
  authenticateAdmin: require('./administrator/authenticateAdmin'),
  updateAdminEmail: require('./administrator/updateAdminEmail'),
  updateAdminPassword: require('./administrator/updateAdminPassword'),
  deleteAdmin: require('./administrator/deleteAdmin'),
  createUpdate: require('./update/createUpdate'),
  modifyUpdate: require('./update/modifyUpdate')
}