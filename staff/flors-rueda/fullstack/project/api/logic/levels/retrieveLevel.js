const {
    validators: { validateId },
} = require('com');

const { Level } = require('../../data/models');

module.exports = (id) => {
    validateId(id);
    return Level.findById(id).then(level => {
        if (!level) throw new Error('level not found');
        return level
    })
}