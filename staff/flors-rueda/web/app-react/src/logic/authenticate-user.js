import { validateUsername, validatePassword, validateCallback} from '../data/validators';
import { findUserByUsername } from '../data/data-managers';

/**
 * Authenticates a user by username and password
 * 
 * @param {string} user The user's username
 * @param {string} password The user's password
 * 
 * @returns {string} The user's id
 */
export const authenticateUser = (user, password, callback) => {
  const username = '@' + user.toLowerCase();

  validateUsername(username)
  validatePassword(password)
  validateCallback(callback);

  findUserByUsername(username, user => {
    if (!user || user.password !== password) {
        callback(new Error('authentication failed'))
        return
    }
    callback(null, user.id)
    })
};