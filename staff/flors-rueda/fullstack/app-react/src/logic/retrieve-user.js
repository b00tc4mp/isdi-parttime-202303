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
export default (userId) => {
  validateId(userId);

  return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => {
      if (res.status !== 200) return res.json().then(({ error }) => { throw new Error(error) })

      return res.json()
    })
}

