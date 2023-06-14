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

  xhr.open('GET', `${import.meta.env.VITE_API_URL}/users/${userId}`)

  xhr.send();
}