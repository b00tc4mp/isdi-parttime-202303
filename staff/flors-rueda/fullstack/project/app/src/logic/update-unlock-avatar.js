import { validators } from 'com';
const { validateAvatar } = validators;
import context from './context';

const updateUnlockAvatar = (avatar = 'basket') => {
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
