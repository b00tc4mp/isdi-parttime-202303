import { validators } from 'com';
const { validateCC, validateOperator } = validators;
import context from './context';

/**
 * Updates the CC achievements of the user.
 *
 * @param {number} cc The new CC value to update.
 * @param {string} operator The arithmetic operator to use for updating the CC value ('+' or '-').
 * @returns {Promise} A promise that resolves when the CC achievements are updated successfully.
 * @throws {Error} If the request to update the CC achievements fails.
 */
const updateCCAchievements = (cc, operator) => {
    validateCC(cc);
    validateOperator(operator);

    const data = { cc, operator };

    return fetch(`${import.meta.env.VITE_API_URL}/achievements/cc`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to update cc achievements');
            }
            return Promise.resolve();
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

export default updateCCAchievements;
