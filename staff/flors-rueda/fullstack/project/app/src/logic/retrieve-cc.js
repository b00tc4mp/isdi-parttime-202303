import context from './context';
import { extractSubFromToken } from './tokenUtils/tokenUtils';

/**
 * Retrieves customization credits value for the current user.
 *
 * @returns {Promise} A Promise that resolves with the user's customization credits information.
 * @throws {Error} If the request to retrieve customization credits information fails.
 */
const retrieveCC = () => {
    return fetch(`${import.meta.env.VITE_API_URL}/users/cc/${extractSubFromToken(context.token)}`, {
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
            return data;
        })
        .catch((error) => {
            throw error;
        });
}

export default retrieveCC