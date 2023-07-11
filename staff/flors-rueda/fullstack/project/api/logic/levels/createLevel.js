const context = require('../context');

const {
    validators: { validateName, validateLayout, validateId },
} = require('com');

module.exports = (name, layout) => {
    validateName(name);
    validateLayout(layout);

    const { levels } = context;

    const level = {
        name: name,
        layout: layout,
    }

    return levels.insertOne(level);

}
