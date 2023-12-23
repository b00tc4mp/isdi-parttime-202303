const { User, List } = require('../../../data/models')

module.exports = () => {

    return Promise.all([
        User.deleteMany(),
        List.deleteMany()
    ])
}