const {
    errors: { ExistenceError },
    validators: { validateId },
} = require('com');
const { Level } = require('../../data/models');


module.exports = (id) => {
    validateId(id, 'levelId');
    return Level.findById(id).then(level => {
        if (!level) throw new ExistenceError('level not found');
        return level
    })
}