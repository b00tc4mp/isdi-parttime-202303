const { User } = require('../../data/models');

const cleanUp = () => User.deleteMany();

module.exports = cleanUp;
