const {
    errors: { ExistenceError },
    validators: { validateId },
} = require('com');
const { Level } = require('../../data/models');

/**
 * Retrieves a level to play by it's id
 * 
 * @param {string} id The level id
 * 
 * @returns {object} Level information
 */

module.exports = (id) => {
    validateId(id, 'levelId');
    return Level.findById(id).then(level => {
        if (!level) throw new ExistenceError('level not found');
        return level
    })
}