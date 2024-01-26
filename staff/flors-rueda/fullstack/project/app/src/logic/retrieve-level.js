import { validators } from 'com';
import context from './context';
import { extractSubFromToken } from './tokenUtils/tokenUtils';
const { validateId } = validators;

/**
 * Retrieves level information by its id.
 *
 * @param {string} id The id of the level to be retrieved.
 * @returns {object} A Promise that resolves with the retrieved level information.
 * @throws {Error} If the validation of the level id fails or if the request fails.
 */
const retrieveLevel = (id) => {
    validateId(id, 'levelId');

    return fetch(`${import.meta.env.VITE_API_URL}/levels/${id}`, {
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
            data.isLevelLiked = (data.likes).includes(extractSubFromToken(context.token));
            data.id = data._id.toString();
            delete data._id;
            return data;
        })
        .catch((error) => {
            throw error;
        });
};

export default retrieveLevel;