import { validators } from 'com';
const { validateGameData } = validators;
import context from './context';

const updateGameAchievements = (gameData) => {
    validateGameData(gameData);
    const data = { gameData };

    return fetch(`${import.meta.env.VITE_API_URL}/api/achievements/game`, {
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
