import { saveUser } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validateCallback, validateId, validateName } from '../data/validators';

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