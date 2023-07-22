const {
    validators: { validateId, validateColor },
    errors: { ExistenceError }
} = require('com');
const { User } = require('../../data/models');

module.exports = function updateColor(userId, color) {
    validateId(userId, 'userId');
    validateColor(color);

    return (async () => {
        const user = await User.findById(userId);
        if (!user) throw new ExistenceError('user not found');
        await User.updateOne({ _id: userId }, { color: color });
    })()

}
