import { validators } from 'com';
import context from './context';
const { validateName, validateLayout, validateHealth } = validators;

/**
 * Creates a new level with the provided information and sends a POST request to the API.
 *
 * @param {string} name The name of the level.
 * @param {string} layout The layout configuration of the level.
 * @param {number} hp The health points value for the level.
 * @returns {Promise} A Promise that resolves when the level creation is successful.
 * @throws {Error} If there's an error during level creation or if API responds with an error.
 */
const createLevel = (name, layout, hp) => {
    validateName(name);
    validateLayout(layout);
    validateHealth(hp);

    const level = { name, layout, hp };

    return fetch(`${import.meta.env.VITE_API_URL}/levels`, {
        method: 'POST',
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

export default createLevel