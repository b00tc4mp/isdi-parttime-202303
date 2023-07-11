const context = require('../context');
const { ObjectId } = require('mongodb');

const {
    validators: { validateId },
} = require('com');

module.exports = (id) => {
    validateId(id);

    const { levels } = context

    return levels.findOne({ _id: new ObjectId(id) })
        .then(level => {
            if (!level) throw new Error('level not found')

            return level
        })
}