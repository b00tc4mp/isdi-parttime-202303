import { validators } from 'com';
import { extractSubFromToken } from './tokenUtils/tokenUtils';
const { validateId } = validators
import context from './context';

/**
 * Retrieves levels created by a specific author using their id.
 *
 * @param {string} id The id of the author whose levels are being retrieved.
 * @returns {[object]} A Promise that resolves with an array of retrieved levels information.
 * @throws {Error} If the validation of the author id fails or if the request fails.
 */
const retrieveLevelsByAuthor = (id) => {
    validateId(id, 'authorId');

    return fetch(`${import.meta.env.VITE_API_URL}/levels/user/${id}`, {
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

export default retrieveLevelsByAuthor