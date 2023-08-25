const { User } = require('../../data/models')

module.exports = async (_users, _posts) => {
    const promises = []

    promises.push(User.insertMany(_users))

    try {
        await Promise.all(promises)
    } catch (error) {
        console.error('Data population error:', error)
    }
}