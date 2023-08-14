import { validators } from 'com';
const { validateCreateData } = validators;
import context from './context';

const updateCreateAchievements = (createData) => {
    validateCreateData(createData);
    const data = { createData };

    return fetch(`${import.meta.env.VITE_API_URL}/achievements/create`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to update create achievements');
            }
            return Promise.resolve();
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

export default updateCreateAchievements;
