import { validators, tokenUtils } from 'com';
import context from './context';

const { validateId } = validators;
const { extractSubFromToken } = tokenUtils;

const createSession = (socketId) => {
    validateId(socketId, 'socketId');

    return fetch(`${import.meta.env.VITE_API_URL}/session/${extractSubFromToken(context.token)}/${socketId}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
    })
        .then(res => {
            if (res.status !== 201) return res.json().then(({ error }) => { throw new Error(error) })
        })
}

export default createSession;