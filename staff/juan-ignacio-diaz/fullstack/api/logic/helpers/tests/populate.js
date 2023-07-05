const context = require('../../context')

module.exports = (tmpUsers, tmpPosts) => {
    const { users, posts } = context

    const promises = []

    promises.push(users.insertMany(tmpUsers))

    if (tmpPosts.length)
        promises.push(posts.insertMany(tmpPosts))

    return Promise.all(promises)
}    