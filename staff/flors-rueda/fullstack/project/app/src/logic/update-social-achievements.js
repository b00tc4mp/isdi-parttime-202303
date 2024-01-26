import context from './context';

/**
 * Updates the user's social achievements.
 *
 * @returns {Promise} A promise that resolves when the social achievements are updated successfully.
 * @throws {Error} If the request to update social achievements fails.
 */
const updateSocialAchievements = () => {
    return fetch(`${import.meta.env.VITE_API_URL}/achievements/social`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to update social achievements');
            }
            return Promise.resolve();
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

export default updateSocialAchievements;
