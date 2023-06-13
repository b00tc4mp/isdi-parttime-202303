import { loadPosts, loadUsers } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validators } from 'com';

const { validateCallback, validateId } = validators;

/**
 * Retrieve's all the posts and its data
 * 
 * @param {string} userAuth The user logged id
 * @param {function} callback Function that controls the errors
 * 
 * @returns an array of posts object
*/
export default (userAuth, callback) => {
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
    const posts = JSON.parse(json)

    callback(null, posts)
  }

  xhr.onerror = () => {
    callback(new Error('Connection error'))
  }

  xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts`)

  xhr.setRequestHeader('Authorization', `Bearer ${userAuth}`)

  xhr.send()
}