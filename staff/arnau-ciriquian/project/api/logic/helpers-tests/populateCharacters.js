const { Character } = require('../../data/models')

module.exports = async (characters) => {
    try {
        const insertedCharacters = await Character.insertMany(characters)
        return insertedCharacters
        
    } catch (error) {
        console.error('Data population error:', error)
    }
}