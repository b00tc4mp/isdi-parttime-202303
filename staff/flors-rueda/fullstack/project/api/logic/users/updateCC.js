const {
    validators: { validateId, validateCC },
    errors: { ExistenceError }
} = require('com');
const { User } = require('../../data/models');
const { validateOperator } = require('com/validators');

module.exports = (userId, cc, operator) => {
    validateId(userId, 'userId');
    validateCC(cc);
    validateOperator(operator);

    return (async () => {
        const user = await User.findById(userId);
        if (!user) throw new ExistenceError('user not found');
        const currentCC = user.cc || 0;
        const newCC = operator === '+' ? currentCC + cc : currentCC - cc
        await User.updateOne({ _id: userId }, { cc: newCC });
    })()
}
