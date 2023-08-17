const { Level } = require('../../data/models');
const { errors: { UnknownError } } = require('com');

const {
    validators: { validateName, validateLayout, validateHealth, validateId },
} = require('com');

/**
 * Creates new level
 * 
 * @param {string} name The name of the new level
 * @param {[array]} layout The layout matrix of the new level
 * @param {number} name The number of the initial health
 * @param {author} author User id of the level creator
 * 
 */

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
