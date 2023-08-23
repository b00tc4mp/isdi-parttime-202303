import { validators } from 'com';
import context from './context';
const { validateId } = validators;

/**
 * Deletes a level using its id.
 *
 * @param {string} levelId - The id of the level to be deleted.
 * @returns {Promise} A Promise that resolves when the level is successfully deleted.
 * @throws {Error} If the validation of levelId fails or if the deletion request is unsuccessful.
 */
const deleteLevel = (levelId) => {
    validateId(levelId, 'levelId');

    return fetch(`${import.meta.env.VITE_API_URL}/levels/${levelId}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
    })
        .then(res => {
            if (res.status !== 200) return res.json().then(({ error }) => { throw new Error(error) })
        })
}

export default deleteLevel;