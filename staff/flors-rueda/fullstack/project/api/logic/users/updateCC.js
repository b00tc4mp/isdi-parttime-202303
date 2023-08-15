const {
    validators: { validateId, validateCC },
    errors: { ExistenceError }
} = require('com');
const { User } = require('../../data/models');

module.exports = (userId, cc) => {
    validateId(userId, 'userId');
    validateCC(cc);

    return (async () => {
        const user = await User.findById(userId);
        if (!user) throw new ExistenceError('user not found');
        const currentCC = user.cc || 0;
        await User.updateOne({ _id: userId }, { cc: currentCC + cc });
    })()
}
