const { Level } = require('../../data/models');
const {
    validators: { validateId },
} = require('com');

module.exports = (authorId) => {
    validateId(authorId, 'authorId');

    return Level.find({ author: authorId })
        .select('_id name author likes date')
        .then(levels => {
            return levels.map(level => {
                return {
                    id: level._id.toString(),
                    name: level.name,
                    author: level.author.toString(),
                    likes: level.likes,
                    date: level.date,
                };
            });
        });
};