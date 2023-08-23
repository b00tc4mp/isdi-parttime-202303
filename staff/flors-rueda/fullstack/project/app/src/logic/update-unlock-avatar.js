import { validators } from 'com';
const { validateAvatar } = validators;
import context from './context';

/**
 * Updates the user's unlocked avatars.
 *
 * This function sends a PATCH request to the server to update the user's unlocked avatar.
 *
 * @param {string} avatar The avatar to be unlocked.
 * @returns {Promise} A promise that resolves when the avatar is unlocked successfully.
 * @throws {Error} If the request to update avatars fails.
 */
const updateUnlockAvatar = (avatar) => {
    validateAvatar(avatar);
    const data = { avatar }

    return fetch(`${import.meta.env.VITE_API_URL}/users/avatars`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to update avatars');
            }
            return Promise.resolve();
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

export default updateUnlockAvatar;
