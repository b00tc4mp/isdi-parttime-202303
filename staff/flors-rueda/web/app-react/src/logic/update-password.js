import { saveUser } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validateNewPassword, validatePasswordChange, validateUserID } from '../data/validators-users';

export const updatePassword = (userId, oldPassword, repeatPassword, newPassword, callback) => {
    validateNewPassword(newPassword, repeatPassword);
    //validateUserID(userId);
    //validatePasswordChange(userId, newPassword);

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