const { validators: { validateCallback, validateId, validatePassword, validateRepeatPassword } } = require('com');

const context = require('../context');
const { ObjectId } = require('mongodb');

module.exports = function updatePassword(userAuth, oldPassword, newPassword, repeatPassword) {
    validateId(userAuth);
    validatePassword(oldPassword);
    if (newPassword === oldPassword) throw new Error('new password equals old password');

    const { users } = context;

    return users.findOneAndUpdate({ _id: new ObjectId(userAuth) }, { $set: { password: newPassword } }).then((user) => {
        if (!user) throw new Error('user not found');
    })
}
