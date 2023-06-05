import { saveUser } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validateId, validateMail, validateCallback } from '../data/validators';

/**
 * Updates an user mail
 * 
 * @param {string} mail The new mail
 * @param {string} userId The user's id
 * @param {function} callback Function that controls the errors
 * 
 */
export const updateMail = (mail, userId, callback) => {
    validateMail(mail);
    validateId(userId)
    validateCallback(callback);
  
    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'));
            return;
        }

        user.mail = mail;
        saveUser(user, () => callback(null));
    })
};