import { validators } from 'com';

const { validateUsername, validateId, validateRecoveryAnswer } = validators;

const checkRecoveryAnswer = (username, questionId, answer) => {
    validateUsername(username);
    validateId(questionId, 'questionId');
    validateRecoveryAnswer(answer);

    const data = { username, questionId, answer }

    return fetch(`${import.meta.env.VITE_API_URL}/api/users/answer`, {
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
        .then((match) => {
            return match;
        })
        .catch((error) => {
            throw error;
        });
};

export default checkRecoveryAnswer;