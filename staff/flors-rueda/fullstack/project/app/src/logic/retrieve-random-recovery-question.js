import { validators } from 'com';
import context from './context';

const { validateUsername } = validators;

const retrieveRandomRecoveryQuestion = (username) => {
    validateUsername(username);
    const data = { username }

    return fetch(`${import.meta.env.VITE_API_URL}/api/users/question`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Request failed');
            }
            return response.json();
        })
        .then((question) => {
            return question;
        })
        .catch((error) => {
            throw error;
        });
};

export default retrieveRandomRecoveryQuestion;