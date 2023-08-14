const { Level, User, Achievements } = require('../../../data/models');

module.exports = async () => {
    await Level.deleteMany();
    await User.deleteMany();
    await Achievements.deleteMany();
}