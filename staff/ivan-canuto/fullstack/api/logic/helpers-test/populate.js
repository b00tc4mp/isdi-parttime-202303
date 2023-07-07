const { User, Post } = require('../../data/models')

module.exports = (_users, _posts) => {

    const promises = []

    promises.push(User.create(_users))

    if(_posts.length)
        promises.push(Post.create(_posts))

    return Promise.all(promises)
}