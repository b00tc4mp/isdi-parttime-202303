import { saveUser } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validators } from 'com';

const { validateCallback, validateId, validateName } = validators;

/**
 * Updates an user display name
 * 
 * @param {string} name The new name
 * @param {string} userId The user's id
 * @param {function} callback Function that controls the errors
 * 
 */
export const updateName = (name, userId, callback) => {
    validateName(name);
    validateId(userId);
    validateCallback(callback);
    
    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'));
            return;
        }

        user.name = name;

        saveUser(user, () => callback(null));
    })
};