import { loadPosts, loadUsers } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validators } from 'com';

const { validateCallback, validateId } = validators;

/**
 * Retrieve's all the posts and its data
 * 
 * @param {string} userId The user logged id
 * @param {function} callback Function that controls the errors
 * 
 * @returns an array of posts object
*/
export default (userId, callback) => {
  validateId(userId);
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
    const user = JSON.parse(json);

    callback(null, user);
  }

  xhr.onerror = () => {
    callback(new Error('connection error'));
  }

  xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts`);

  xhr.setRequestHeader('Content-Type', 'application/json');

  const data = { userId };
  const json = JSON.stringify(data);

  xhr.send(json);
}