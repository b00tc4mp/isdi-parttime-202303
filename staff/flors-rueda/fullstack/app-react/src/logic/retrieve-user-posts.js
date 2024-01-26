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

  const xhr = new XMLHttpRequest()

  xhr.onload = () => {
    const { status } = xhr

    if (status !== 200) {
      const { response: json } = xhr
      const { error } = JSON.parse(json)

      callback(new Error(error))

      return
    }

    const { response: json } = xhr
    const post = JSON.parse(json)

    callback(null, post)
  }

  xhr.onerror = () => {
    callback(new Error('Connection error'))
  }

  xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts/user/${userId}`)

  xhr.setRequestHeader('Authorization', `Bearer ${userAuth}`)

  xhr.send()
}