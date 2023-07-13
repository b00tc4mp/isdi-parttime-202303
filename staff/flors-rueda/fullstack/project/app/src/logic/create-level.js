import { validators } from 'com';

const { validateCallback, validateName, validateLayout } = validators;

//TODO add validate hp!

const createLevel = (name, layout, hp) => {
    validateName(name);
    validateLayout(layout);

    const level = { name, layout, hp };

    return fetch(`${import.meta.env.VITE_API_URL}/levels`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(level)
    })
        .then(res => {
            if (res.status !== 201) return res.json().then(({ error }) => { throw new Error(error) })
        })
}

export default createLevel