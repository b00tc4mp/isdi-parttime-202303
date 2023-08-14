import { validators } from 'com';
const { validateId } = validators;
import context from './context';

const toggleSave = (levelId) => {
    validateId(levelId);

    return fetch(`${import.meta.env.VITE_API_URL}/levels/save/${levelId}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to update like');
            }
            return Promise.resolve();
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

export default toggleSave;
