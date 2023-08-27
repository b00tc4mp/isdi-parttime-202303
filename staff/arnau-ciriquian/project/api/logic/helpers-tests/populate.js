const { User } = require('../../data/models')

module.exports = async (_users, _posts) => {
    try {
        const insertedUsers = await User.insertMany(_users)
        return insertedUsers
        
    } catch (error) {
        console.error('Data population error:', error)
    }
}