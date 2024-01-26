import { validators } from 'com';
import { findUserByUsername } from '../data/data-managers';

const { validateUsername, validatePassword } = validators;

/**
 * Authenticates a user by username and password
 * 
 * @param {string} user The user's username
 * @param {string} password The user's password
 * 
 * @returns {string} The user's id
 */

export default (username, password) => {
  validateUsername(username);
  validatePassword(password);

  const credentials = { username, password }

  return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(res => {
      if (res.status !== 200) return res.json().then(({ error }) => { throw new Error(error) })

      return res.json()
    })
}

