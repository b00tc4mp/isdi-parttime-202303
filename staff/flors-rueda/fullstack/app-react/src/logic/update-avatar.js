import { saveUser } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validators } from 'com';

const { validateCallback, validateId } = validators;


/**
 * Update the avatar
 * 
 * @param {string} newSrc The new image url or base64 string
 * @param {string} userId The user id
 * @param {function} callback Function that controls the errors
 * 
*/
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