import { findUserById } from '../data/data-managers';
import { validators } from 'com';

const { validateCallback, validateId } = validators;

/**
 * Retrieve's the data of an user by its id
 * 
 * @param {string} userId The user id
 * @param {function} callback Function that controls the errors
 * 
 * @returns a user object
*/
export const retrieveUser = (userId, callback) => {
  validateId(userId);
  validateCallback(callback);

  findUserById(userId, user => {
    if (!user) {
        callback(new Error('user not found'));
        return;
    }

    const _user = {
      username: user.username,
      name: user.name,
      mail: user.mail,
      avatar: user.avatar,
      joined: user.joined,
    }

    callback(null, _user)
  })
};