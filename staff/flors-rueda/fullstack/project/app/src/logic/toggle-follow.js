import { validators } from 'com';
const { validateId } = validators;
import context from './context';

const toggleFollow = (userId) => {
    validateId(userId);

    return fetch(`${import.meta.env.VITE_API_URL}/users/follow/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to update follow');
            }
            return Promise.resolve();
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

export default toggleFollow;
