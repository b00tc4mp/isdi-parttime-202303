import { saveUser } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validateId, validateMail, validateCallback } from '../data/validators';

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