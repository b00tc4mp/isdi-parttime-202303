const { Level } = require('../../data/models');

const {
    validators: { validateName, validateLayout, validateId },
} = require('com');

module.exports = (name, layout, hp) => {
    validateName(name);
    validateLayout(layout);

    return Level.create({
        name,
        layout,
        hp,
    }).catch(error => {
        throw error
    })
}
