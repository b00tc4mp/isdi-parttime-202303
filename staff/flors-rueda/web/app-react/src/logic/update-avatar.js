import { saveUser } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validateCallback, validateId } from '../data/validators';

export const updateAvatar = (newSrc, userId, callback) => {
    validateId(userId);
    validateCallback(callback);

    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'));
            return;
        }
        
        user.avatar = newSrc;

        saveUser(user, () => callback(null));
    })
};