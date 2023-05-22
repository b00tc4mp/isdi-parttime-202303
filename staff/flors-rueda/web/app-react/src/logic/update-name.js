import { saveUser } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validateMail, validateUserID } from '../data/validators-users';

export const updateName = (name, userId, callback) => {
    //validateUserID(userId);
    //validateMail(mail);
    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'));
            return;
        }

        user.name = name;

        saveUser(user, () => callback(null));
    })
};