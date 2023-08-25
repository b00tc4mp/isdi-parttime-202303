import context from './context';
import { extractSubFromToken } from './tokenUtils/tokenUtils';

/**
 * Retrieves information about the currently logged-in user.
 *
 * @returns {object} A Promise that resolves with information about the logged-in user.
 * @throws {Error} If the request fails.
 */
const retrieveLoggedUser = () => {
    return fetch(`${import.meta.env.VITE_API_URL}/users/auth/${extractSubFromToken(context.token)}`, {
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

export default retrieveLoggedUser