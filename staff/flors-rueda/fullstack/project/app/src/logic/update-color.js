import { validators } from 'com';
const { validateColor } = validators;
import context from './context';

/**
 * Updates the user's profile color.
 *
 * @param {string} color The new color to update the user's profile.
 * @returns {Promise} A promise that resolves when the profile color is updated successfully.
 * @throws {Error} If the request to update the color fails.
 */
const updateColor = (color) => {
    validateColor(color);
    const data = { color: color };

    return fetch(`${import.meta.env.VITE_API_URL}/users/color`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to update color');
            }
            return Promise.resolve();
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

export default updateColor;
