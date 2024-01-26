const { Level, User } = require('../../data/models');
const { errors: { ExistenceError } } = require('com');

const {
    validators: { validateName, validateLayout, validateHealth, validateId },
} = require('com');

/**
 * Modifies a level recovered by it's level id
 * 
 * @param {string} levelId The level to modify id
 * @param {string} name The name of the new level
 * @param {[array]} layout The layout matrix of the new level
 * @param {number} name The number of the initial health
 * @param {author} author User id of the level creator
 * 
 */

module.exports = (levelId, author, layout, name, hp) => {
    validateId(levelId, 'levelId')
    validateId(author, 'authorId');
    validateName(name);
    validateLayout(layout);
    validateHealth(hp);

    return (async () => {
        const user = await User.findById(author);
        if (!user) throw new ExistenceError('user not found');
        const level = await Level.findById(levelId);
        if (!level) throw new ExistenceError('level not found');

        await Level.updateOne(
            { _id: levelId },
            { name: name, layout: layout, hp: hp, date: Date.now() }
        );
    })()
}
