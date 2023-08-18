import { validators, tokenUtils } from 'com';
import context from './context';

const { extractSubFromToken } = tokenUtils;

const cleanSession = () => {

    return fetch(`${import.meta.env.VITE_API_URL}/session/${extractSubFromToken(context.token)}`, {
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

export default cleanSession;