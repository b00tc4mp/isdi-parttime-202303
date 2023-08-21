import { validators } from 'com';
import context from './context';

const { validateName, validateLayout, validateHealth, validateId } = validators;

const editLevel = (levelId, name, layout, hp) => {
    validateId(levelId, 'levelId');
    validateName(name);
    validateLayout(layout);
    validateHealth(hp);

    const level = { name, layout, hp };

    return fetch(`${import.meta.env.VITE_API_URL}/levels/${levelId}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify(level)
    })
        .then(res => {
            if (res.status !== 201) return res.json().then(({ error }) => { throw new Error(error) })
        })
}

export default editLevel