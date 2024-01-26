import { validators } from 'com';
const { validateId } = validators;
import context from './context';

/**
 * Toggles the save status for a level.
 *
 * @param {string} levelId The ID of the level to toggle save status for.
 * @returns {Promise} A promise that resolves when the save status is toggled successfully.
 * @throws {Error} If the request to update save status fails.
 */

const toggleSave = (levelId) => {
    validateId(levelId);

    return fetch(`${import.meta.env.VITE_API_URL}/levels/save/${levelId}`, {
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

export default toggleSave;
