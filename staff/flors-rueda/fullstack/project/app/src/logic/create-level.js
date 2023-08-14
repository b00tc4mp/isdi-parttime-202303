import { validators } from 'com';
import context from './context';

const { validateName, validateLayout, validateHealth } = validators;

const createLevel = (name, layout, hp) => {
    validateName(name);
    validateLayout(layout);
    validateHealth(hp);

    const level = { name, layout, hp };

    return fetch(`${import.meta.env.VITE_API_URL}/api/levels`, {
        method: 'POST',
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

export default createLevel