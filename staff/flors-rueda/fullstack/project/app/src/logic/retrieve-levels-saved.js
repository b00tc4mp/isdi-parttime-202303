import { validators } from 'com';
import { extractSubFromToken } from './tokenUtils/tokenUtils';
const { validateId } = validators;
import context from './context';

/**
 * Retrieves levels saved by a specific user using their id.
 *
 * @param {string} id The id of the user whose saved levels are being retrieved.
 * @returns {[object]} A Promise that resolves with an array of retrieved levels information.
 * @throws {Error} If the validation of the user ID fails or if the request fails.
 */
const retrieveLevelsSaved = (id) => {
    validateId(id, 'userId');

    return fetch(`${import.meta.env.VITE_API_URL}/levels/saved/${id}`, {
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
            for (let level of data) {
                level.isLevelLiked = (level.likes).includes(extractSubFromToken(context.token))
            }
            return data;
        })
        .catch((error) => {
            throw error;
        });
};

export default retrieveLevelsSaved