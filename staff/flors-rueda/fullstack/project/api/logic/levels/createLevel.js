const { Level } = require('../../data/models');

const {
    validators: { validateName, validateLayout, validateId },
} = require('com');

module.exports = (name, layout) => {
    validateName(name);
    validateLayout(layout);

    return Level.create({
        name,
        layout,
    }).catch(error => {
        throw error
    })
}
