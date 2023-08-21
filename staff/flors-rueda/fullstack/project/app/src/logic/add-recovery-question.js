import { validators } from 'com';
const { validatePassword, validateRecoveryQuestion } = validators;
import context from './context';

const addRecoveryQuestion = (password, recoveryQuestions) => {
    validatePassword(password);
    for (let question of recoveryQuestions) {
        validateRecoveryQuestion(question);
    };

    const data = { password, recoveryQuestions };

    return fetch(`${import.meta.env.VITE_API_URL}/users/questions`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to add question');
            }
            return Promise.resolve();
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

export default addRecoveryQuestion;
