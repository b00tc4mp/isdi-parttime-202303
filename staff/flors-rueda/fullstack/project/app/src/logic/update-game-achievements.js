import { validators } from 'com';
const { validateGameData } = validators;
import context from './context';

/**
 * Updates the user's game achievements.
 * 
 * @param {Object} gameData The new game achievements data to update.
 * @returns {Promise} A promise that resolves when the game achievements are updated successfully.
 * @throws {Error} If the request to update the game achievements fails.
 */

const updateGameAchievements = (gameData) => {
    validateGameData(gameData);
    const data = { gameData };

    return fetch(`${import.meta.env.VITE_API_URL}/achievements/game`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to update game achievements');
            }
            return Promise.resolve();
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

export default updateGameAchievements;
