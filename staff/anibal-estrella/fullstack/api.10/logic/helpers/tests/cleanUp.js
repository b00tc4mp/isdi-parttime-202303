const context = require('../../context')

module.exports = () => {
    const { users, posts } = context

    // in series
    // return users.deleteMany()
    //     .then(() => posts.deleteMany())

    // in parallel (faster)
    return Promise.all([
        users.deleteMany(),
        posts.deleteMany()
    ])
}