const { User } = require('../../../data/models')

module.exports = () => {

    return Promise.all([
        User.deleteMany(),
    ])
}