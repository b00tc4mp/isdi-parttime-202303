const { User } = require('../../data/models')

module.exports = async (_users) => await User.insertMany(_users)