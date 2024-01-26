import { validators } from 'com';
const { validateId } = validators;
import context from './context';

/**
 * Toggles the follow status for a concrete user.
 *
 * @param {string} userId The id of the user to toggle follow status for.
 * @returns {Promise} A promise that resolves when the follow status is toggled successfully.
 * @throws {Error} If the request to update follow status fails.
 */

const toggleFollow = (userId) => {
    validateId(userId);

    return fetch(`${import.meta.env.VITE_API_URL}/users/follow/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to update follow');
            }
            return Promise.resolve();
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

export default toggleFollow;
