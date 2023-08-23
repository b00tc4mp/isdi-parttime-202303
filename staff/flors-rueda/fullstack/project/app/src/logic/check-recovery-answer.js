import { validators } from 'com';
const { validateUsername, validateId, validateRecoveryAnswer } = validators;

/**
 * Checks the recovery answer for a user's security question.
 *
 * @param {string} username The username of the user whose recovery answer is being checked.
 * @param {string} questionId The id of the security question being checked.
 * @param {string} answer The recovery answer provided by the user for the security question.
 * @returns {Promise} A Promise that resolves to the response data from the API, indicating whether the recovery answer is correct.
 * @throws {Error} If the request to the API fails or an error occurs during processing.
 */
const checkRecoveryAnswer = (username, questionId, answer) => {
    validateUsername(username);
    validateId(questionId, 'questionId');
    validateRecoveryAnswer(answer);

    const data = { username, questionId, answer }

    return fetch(`${import.meta.env.VITE_API_URL}/users/answer`, {
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