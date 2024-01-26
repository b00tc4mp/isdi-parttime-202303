import context from './context';
import { extractSubFromToken } from './tokenUtils/tokenUtils';

/**
 * Retrieves avatars that the currently logged-in user has unlocked.
 *
 * @returns {object} A Promise that resolves with information about the avatars the user has unlocked.
 * @throws {Error} If the request fails.
 */
const retrieveUnlockAvatars = () => {
    return fetch(`${import.meta.env.VITE_API_URL}/users/avatars/${extractSubFromToken(context.token)}`, {
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

export default retrieveUnlockAvatars