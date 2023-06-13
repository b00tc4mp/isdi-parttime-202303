import { loadPosts, loadUsers, savePosts, saveUsers } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validators } from 'com';

const { validateCallback, validateId, validatePassword } = validators;

/**
 * Deletes a user by user id and password
 * 
 * @param {string} userId The user's id
 * @param {string} password The user's password
 * @param {function} callback Function that controls the errors
 * 
 */
export default (userId, password, callback) => {
  validateId(userId);
  validatePassword(password);
  validateCallback(callback);

  const xhr = new XMLHttpRequest;

  xhr.onload = () => {
    const { status } = xhr;

    if (status !== 201) {
      const { response: json } = xhr;
      const { error } = JSON.parse(json);

      callback(new Error(error));

      return;
    }

    callback(null);
  }

  xhr.onerror = () => {
    callback(new Error('connection error'));
  }

  xhr.open('DELETE', `${import.meta.env.VITE_API_URL}/users/${userId}`);

  xhr.setRequestHeader('Content-Type', 'application/json');

  const user = { password };
  const json = JSON.stringify(user);

  xhr.send(json);
}