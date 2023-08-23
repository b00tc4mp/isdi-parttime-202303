import context from './context';

/**
 * Updates the user's tutoriañ achievements.
 *
 * @returns {Promise} A promise that resolves when the tutorial achievements are updated successfully.
 * @throws {Error} If the request to update tutorial achievements fails.
 */
const updateTutorialAchievements = () => {
    return fetch(`${import.meta.env.VITE_API_URL}/achievements/tutorial`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to update tutorial achievements');
            }
            return Promise.resolve();
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

export default updateTutorialAchievements;
