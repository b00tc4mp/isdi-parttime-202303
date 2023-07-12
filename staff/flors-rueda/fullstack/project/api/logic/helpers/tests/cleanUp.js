const { Level } = require('../../../data/models');

module.exports = async () => {
    await Level.deleteMany();
}