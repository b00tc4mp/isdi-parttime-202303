import { validators } from 'com';
const { validateCC } = validators;
import context from './context';

const updateCC = (cc) => {
    validateCC(cc);
    //TODO divide between ADD and SPEND
    const data = { cc }

    return fetch(`${import.meta.env.VITE_API_URL}/users/cc`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to update cc');
            }
            return Promise.resolve();
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

export default updateCC;
