import { validators } from 'com';
const { validatePassword, validateUsername } = validators;
import context from './context';

const loginUser = (username, password) => {
    validateUsername(username);
    validatePassword(password);

    const credentials = { username, password }

    return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(async res => {
            if (res.status === 200) {
                const token = await res.json();
                context.token = token;
                return
            }

            if (res.status !== 200) return res.json().then(({ error }) => { throw new Error(error) })

            return res.json()
        })
}

export default loginUser