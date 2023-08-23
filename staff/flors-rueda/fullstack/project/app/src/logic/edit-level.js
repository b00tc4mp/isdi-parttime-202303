import { validators } from 'com';
import context from './context';
const { validateName, validateLayout, validateHealth, validateId } = validators;

/**
 * Edits a level with new information.
 *
 * @param {string} levelId The id of the level to be edited.
 * @param {string} name The updated name of the level.
 * @param {string} layout The updated layout of the level.
 * @param {number} hp The updated health points of the level.
 * @returns {Promise} A Promise that resolves when the level is successfully edited.
 * @throws {Error} If the validation of parameters fails or if the edit request is unsuccessful.
 */
const editLevel = (levelId, name, layout, hp) => {
    validateId(levelId, 'levelId');
    validateName(name);
    validateLayout(layout);
    validateHealth(hp);

    const level = { name, layout, hp };

    return fetch(`${import.meta.env.VITE_API_URL}/levels/${levelId}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify(level)
    })
        .then(res => {
            if (res.status !== 201) return res.json().then(({ error }) => { throw new Error(error) })
        })
}

export default editLevel