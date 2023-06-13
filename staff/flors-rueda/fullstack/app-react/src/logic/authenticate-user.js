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
export default (username, password, callback) => {
  validateUsername(username);
  validatePassword(password);
  validateCallback(callback);

  const xhr = new XMLHttpRequest;

  xhr.onload = () => {
    const { status } = xhr;

    if (status !== 200) {
      const { response: json } = xhr;
      const { error } = JSON.parse(json);

      callback(new Error(error));

      return;
    }

    const { response: json } = xhr;
    const { userId } = JSON.parse(json);

    callback(null, userId);
  }

  xhr.onerror = () => {
    callback(new Error('connection error'));
  }

  xhr.open('POST', `${import.meta.env.VITE_API_URL}/users/auth`);

  xhr.setRequestHeader('Content-Type', 'application/json');

  const user = { username, password };
  const json = JSON.stringify(user);

  xhr.send(json);
}

