import { validators, tokenUtils } from 'com';
import context from './context';

const { validateId } = validators;

const deleteLevel = (levelId) => {
    validateId(levelId, 'levelId');

    return fetch(`${import.meta.env.VITE_API_URL}/levels/${levelId}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
    })
        .then(res => {
            if (res.status !== 200) return res.json().then(({ error }) => { throw new Error(error) })
        })
}

export default deleteLevel;