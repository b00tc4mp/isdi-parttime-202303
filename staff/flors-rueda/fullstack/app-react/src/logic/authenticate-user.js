import { validators } from 'com';
import { findUserByUsername } from '../data/data-managers';

const { validateUsername, validatePassword, validateCallback } = validators;

/**
 * Authenticates a user by username and password
 * 
 * @param {string} user The user's username
 * @param {string} password The user's password
 * @param {function} callback Function that controls the errors
 * 
 * @returns {string} The user's id
 */
export const authenticateUser = (user, password, callback) => {
  validateUsername(user);
  validatePassword(password);
  validateCallback(callback);

  const username = `@${user.toLowerCase()}`;



  findUserByUsername(username, user => {
    if (!user || user.password !== password) {
      callback(new Error('authentication failed'))
      return
    }
    callback(null, user.id)
  })
};