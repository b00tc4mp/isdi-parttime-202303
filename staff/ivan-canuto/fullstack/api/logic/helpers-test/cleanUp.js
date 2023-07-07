const { User, Post } = require('../../data/models')

module. exports = () => {

    // in series
    // return users.deleteMany()
    //     .then(() => posts.deleteMany())

    // in parallel (faster)
    return Promise.all([
        User.deleteMany(),
        Post.deleteMany()
    ])
}