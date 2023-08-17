const {
    validators: { validateUsername, validatePassword },
    errors: { ExistenceError, AuthError }
} = require('com');
const { User } = require('../../data/models');
const bcrypt = require('bcryptjs');

/**
 * Updates a user password
 * 
 * @param {string} username The user username
 * @param {string} newPassword The new password
 * 
 * @returns {boolean} Is answer correct
 */

module.exports = (username, newPassword) => {
    validateUsername(username);
    validatePassword(newPassword);

    return (async () => {
        const user = await User.findOne({ username });
        if (!user) throw new ExistenceError('user not found');
        const userId = user._id
        const cryptPassword = await bcrypt.hash(newPassword, 10);
        await User.updateOne({ _id: userId }, { password: cryptPassword });
    })()
}
