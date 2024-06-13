const { User } = require('../../data/models')

module.exports = async (users) => {
    try {
        const insertedUsers = await User.insertMany(users)
        return insertedUsers
        
    } catch (error) {
        console.error('Data population error:', error)
    }
}