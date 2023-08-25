import { validators } from 'com';
import context from './context';
import { extractSubFromToken } from './tokenUtils/tokenUtils';
const { validateName } = validators;

/**
 * Searches for users based on a given username.
 *
 * @param {string} username The username to search for username.
 * @returns {Array} A Promise that resolves with an array of users matching the search.
 * @throws {Error} If the name validation or request fails.
 */
const searchUsers = (username) => {
    validateName(username);

    return fetch(`${import.meta.env.VITE_API_URL}/users/search/${username}`, {
        headers: {
            Authorization: `Bearer ${context.token}`
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Request failed');
            }
            return response.json();
        })
        .then((data) => {
            for (let user of data) {
                user.id = user._id.toString();
                user.isFollowed = (user.followers).includes(extractSubFromToken(context.token));
                delete user._id;
            }
            return data;
        })
        .catch((error) => {
            throw error;
        });
};

export default searchUsers;