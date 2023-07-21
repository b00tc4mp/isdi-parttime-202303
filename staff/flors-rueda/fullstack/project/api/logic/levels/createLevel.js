const { Level } = require('../../data/models');

const {
    validators: { validateName, validateLayout, validateId },
} = require('com');

module.exports = (name, layout, hp, author) => {
    validateName(name);
    validateLayout(layout);
    //TODO validateHp()
    //TODO validateAuthor()

    return Level.create({
        name,
        layout,
        hp,
        author,
        likes: [],
        date: Date.now(),
    }).catch(error => {
        throw error
    })
}
