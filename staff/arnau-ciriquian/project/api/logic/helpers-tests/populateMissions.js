const { Mission } = require('../../data/models')

module.exports = async (missions) => {
    try {
        const insertedMissions = await Mission.insertMany(missions)
        return insertedMissions
        
    } catch (error) {
        console.error('Data population error:', error)
    }
}