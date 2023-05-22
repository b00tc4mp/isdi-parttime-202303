import { saveUser } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validateMail, validateUserID } from '../data/validators-users';

export const updateMail = (mail, userId, callback) => {
    //validateUserID(userId);
    //validateMail(mail);
    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'));
            return;
        }

        user.mail = mail;
        saveUser(user, () => callback(null));
    })
};