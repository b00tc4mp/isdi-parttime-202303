const { Level, User } = require('../../../data/models');

module.exports = async () => {
    await Level.deleteMany();
    await User.deleteMany();
}