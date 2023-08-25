import { validators } from 'com';
import context from './context';
const { validateId } = validators;
import { extractSubFromToken } from './tokenUtils/tokenUtils';

/**
 * Retrieves information about a user based on their id.
 *
 * @param {string} id The user id for which information is to be retrieved.
 * @returns {object} A Promise that resolves with information about the retrieved user.
 * @throws {Error} If the user id validation or request fails.
 */
const retrieveUser = (id) => {
    validateId(id, 'userId');

    return fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
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
            data.isFollowed = (data.followers).includes(extractSubFromToken(context.token));
            return data;
        })
        .catch((error) => {
            throw error;
        });
};

export default retrieveUser;