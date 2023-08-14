import { validators } from 'com';
const { validateColor } = validators;
import context from './context';

const updateColor = (color) => {
    validateColor(color);
    const data = { color: color };

    return fetch(`${import.meta.env.VITE_API_URL}/api/users/color`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to update color');
            }
            return Promise.resolve();
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

export default updateColor;
