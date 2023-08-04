const { Level } = require('../../data/models');
const { errors: { UnknownError } } = require('com');

const {
    validators: { validateName, validateLayout, validateHealth, validateId },
} = require('com');

module.exports = (name, layout, hp, author) => {
    validateName(name);
    validateLayout(layout);
    validateHealth(hp)
    validateId(author, 'authorId')

    return Level.create({
        name,
        layout,
        hp,
        author,
        likes: [],
        date: Date.now(),
    }).catch(error => {
        throw UnknownError(error.message)
    })
}
