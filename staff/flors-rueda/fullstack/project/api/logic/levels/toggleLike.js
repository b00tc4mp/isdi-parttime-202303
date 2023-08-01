const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com');
const { User, Level } = require('../../data/models');


module.exports = async (levelId, userId) => {
    validateId(levelId, 'levelId');
    validateId(userId, 'userId');

    const user = await User.findById(userId);
    const level = await Level.findById(levelId);

    if (!user || !level) throw new ExistenceError('user / level not found');

    const likes = level.likes || [];
    //TODO Add saves users

    const index = likes.indexOf(userId);
    if (index !== -1) {
        likes.splice(index, 1);
    } else {
        likes.push(userId);
    }

    await Level.updateOne({ _id: levelId }, { likes: likes });

};
