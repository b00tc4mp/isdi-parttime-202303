const { User, Post } = require('../../../data/models')

module.exports = () => {

    return Promise.all([
        User.deleteMany(),
        Post.deleteMany()
    ])
}