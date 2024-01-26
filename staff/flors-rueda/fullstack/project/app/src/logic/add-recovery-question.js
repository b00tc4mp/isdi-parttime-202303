import { validators } from 'com';
const { validatePassword, validateRecoveryQuestion } = validators;
import context from './context';

/**
 * Adds recovery questions for a user.
 *
 * @param {string} password User's password for validation.
 * @param {Array} recoveryQuestions Array of recovery questions.
 * @returns {Promise} A promise that resolves when the operation is successful.
 * @throws {Error} If there's an issue with the request or validation.
 */
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
