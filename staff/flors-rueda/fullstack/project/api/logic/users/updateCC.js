const {
    validators: { validateId, validateCC },
    errors: { ExistenceError }
} = require('com');
const { User } = require('../../data/models');
const { validateOperator } = require('com/validators');

/**
 * Updates cc available by user id
 * 
 * @param {string} userId The user id
 * @param {string} cc The number of cc to update
 * @param {string} operator Use + for earning operations and - for spending operations
 * 
 */

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
