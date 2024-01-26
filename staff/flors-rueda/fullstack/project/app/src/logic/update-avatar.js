import { validators } from 'com';
const { validateAvatar } = validators;
import context from './context';

/**
 * Updates the avatar of the user.
 *
 * @param {string} avatar The new avatar value to update.
 * @returns {Promise} A promise that resolves when the avatar is updated successfully.
 * @throws {Error} If the request to update the avatar fails.
 */
const updateAvatar = (avatar) => {
    validateAvatar(avatar)
    const data = { avatar: avatar }

    return fetch(`${import.meta.env.VITE_API_URL}/users/avatar`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to update avatar');
            }
            return Promise.resolve();
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

export default updateAvatar;
