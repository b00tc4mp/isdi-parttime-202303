import { saveUser } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validators } from 'com';

const { validateCallback, validateId, validatePassword } = validators;



/**
 * Updates an user password
 * 
 * @param {string} userId The user's id
 * @param {string} oldPassword The user's old password
 * @param {string} newPassword The user's new password
 * @param {string} repeatPassword The user's new password confirmation
 * @param {function} callback Function that controls the errors
 * 
 */
export const updatePassword = (userId, oldPassword, newPassword, repeatPassword, callback) => {
    validateId(userId);
    validatePassword(oldPassword);
    validatePassword(newPassword);
    validatePassword(repeatPassword);
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