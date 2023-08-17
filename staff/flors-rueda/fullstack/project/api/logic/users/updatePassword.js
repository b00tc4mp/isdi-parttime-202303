const {
    validators: { validateId, validatePassword },
    errors: { ExistenceError, AuthError }
} = require('com');
const { User } = require('../../data/models');
const bcrypt = require('bcryptjs');

/**
 * Change's a user password
 * 
 * @param {string} userId The user id
 * @param {string} newPassword The user new password
 * @param {string} oldPassword The user old password
 * 
 */

module.exports = (userId, newPassword, oldPassword) => {
    validateId(userId, 'userId');
    validatePassword(newPassword);
    validatePassword(oldPassword);

    return (async () => {
        const user = await User.findById(userId);
        if (!user) throw new ExistenceError('user not found');
        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) throw new AuthError('wrong credentials');
        const cryptPassword = await bcrypt.hash(newPassword, 10);
        await User.updateOne({ _id: userId }, { password: cryptPassword });
    })()
}
