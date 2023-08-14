import { validators, errors } from 'com';
const { validatePassword, validateUsername } = validators;
import context from './context';
const { AuthError } = errors;

const loginUser = (username, password) => {
    validateUsername(username);
    validatePassword(password);

    const credentials = { username, password }

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        if (res.status === 200) {
            const token = await res.json()

            context.token = token

            return
        }

        throw new AuthError('password / username not correct')
    })()
}

export default loginUser