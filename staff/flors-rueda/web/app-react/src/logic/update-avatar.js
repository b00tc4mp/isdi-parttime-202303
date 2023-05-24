import { saveUser } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validateAvatarUrl, validateUserID } from '../data/validators-users';

export const updateAvatar = (newSrc, userId, callback) => {
    //validateUserID(userId);
    //if (!random) validateAvatarUrl(newSrc);
    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'));
            return;
        }
        
        user.avatar = newSrc;

        saveUser(user, () => callback(null));
    })
};