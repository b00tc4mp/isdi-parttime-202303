const { User } = require('../../data/models');

module.exports = (_users) => User.insertMany(_users);
