import { loadPosts } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validators } from 'com';

const { validateCallback, validateId } = validators;

/**
 * Retrieve's all the posts published by an specific user by its id.
 * 
 * @param {string} userId The user id
 * @param {string} userAuth The user logged id
 * @param {function} callback Function that controls the errors
 * 
 * @returns an array of posts object
*/
export default (userId, userAuth, callback) => {
  validateId(userId);
  validateId(userAuth);
  validateCallback(callback);

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

  xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts/${userId}`);

  xhr.setRequestHeader('Content-Type', 'application/json');

  const data = { userAuth };
  const json = JSON.stringify(data);

  xhr.send(json);
}