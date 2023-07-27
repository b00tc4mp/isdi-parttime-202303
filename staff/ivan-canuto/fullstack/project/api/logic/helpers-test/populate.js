const { User, Post } = require('../../data/models')

module.exports = (_users, _posts) => {

    const promises = []

    promises.push(User.insertMany(_users))

    if(_posts) {
        promises.push(Post.insertMany(_posts))
    }

    return Promise.all(promises)
}