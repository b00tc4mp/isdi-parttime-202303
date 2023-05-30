import { saveUser } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validateCallback, validateId, validatePassword } from '../data/validators';

export const updatePassword = (userId, oldPassword, repeatPassword, newPassword, callback) => {
    validateId(userId);
    validatePassword(oldPassword);
    validatePassword(repeatPassword);
    validatePassword(newPassword);
    validateCallback(callback);

    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'));
            return;
        }

        if (oldPassword !== user.password) {
            callback(new Error('wrong password'));
            return;
        }

        if (newPassword === user.password) {
            callback(new Error('new password equals old password'));
            return;
        }

        user.password = newPassword;
        saveUser(user, () => callback(null));
    })
}