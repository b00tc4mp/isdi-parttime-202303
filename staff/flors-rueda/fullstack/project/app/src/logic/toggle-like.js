import { validators } from 'com';
const { validateId } = validators;
import context from './context';

/**
 * Toggles the like status for a level.
 *
 * @param {string} levelId The id of the level to toggle like status for.
 * @returns {Promise} A promise that resolves when the like status is toggled successfully.
 * @throws {Error} If the request to update like status fails.
 */
const toggleLike = (levelId) => {
    validateId(levelId)

    return fetch(`${import.meta.env.VITE_API_URL}/levels/like/${levelId}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to update like');
            }
            return Promise.resolve();
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

export default toggleLike;
