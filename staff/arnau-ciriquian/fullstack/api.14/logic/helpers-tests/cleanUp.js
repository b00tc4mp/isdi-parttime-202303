const context = require('.././context')

module.exports = () => {


    return Promise.all([
        users.deleteMany(),
        posts.deleteMany()
    ])
}