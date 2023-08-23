import { validators } from 'com';
import context from './context';
const { validateId } = validators;

/**
 * Retrieves complete achievements for a user by their id.
 *
 * @param {string} id The id of the user whose complete achievements are being retrieved.
 * @returns {Promise} A Promise that resolves with the user's complete achievements.
 * @throws {Error} If the validation of the user id fails or if the request fails.
 */
const retrieveCompleteAchievements = (id) => {
    validateId(id, 'userId');

    return fetch(`${import.meta.env.VITE_API_URL}/achievements/${id}`, {
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
};

export default retrieveCompleteAchievements;