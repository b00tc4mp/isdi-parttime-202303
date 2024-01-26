import { validators } from 'com';
import context from './context';
import { extractSubFromToken } from './tokenUtils/tokenUtils';
const { validateName } = validators;

/**
 * Searches for levels based on a given name.
 *
 * @param {string} name The name to search for levels.
 * @returns {Array} A Promise that resolves with an array of levels matching the search.
 * @throws {Error} If the name validation or request fails.
 */
const searchLevels = (name) => {
    validateName(name);

    return fetch(`${import.meta.env.VITE_API_URL}/levels/search/${name}`, {
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

export default searchLevels;