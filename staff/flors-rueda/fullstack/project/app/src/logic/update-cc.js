import { validators } from 'com';
const { validateCC, validateOperator } = validators;
import context from './context';

const updateCC = (cc, operator) => {
    validateCC(cc);
    //validateOperator(operator);

    const data = { cc, operator }

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
