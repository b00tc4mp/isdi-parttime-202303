const { User, Workspot } = require('../../../data/models')

module.exports = async function cleanUp() {
    await Promise.all([
        User.deleteMany(),
        Workspot.deleteMany(),
    ])
}

