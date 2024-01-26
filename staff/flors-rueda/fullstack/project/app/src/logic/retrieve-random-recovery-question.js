import { validators } from 'com';
const { validateUsername } = validators;

/**
 * Retrieves a random recovery question for a specific user.
 *
 * @param {string} username the username for which a random recovery question is to be retrieved.
 * @returns {Promise} A Promise that resolves with the retrieved recovery question.
 * @throws {Error} If the validation of the username fails or if the request fails.
 */
const retrieveRandomRecoveryQuestion = (username) => {
    validateUsername(username);
    const data = { username }

    return fetch(`${import.meta.env.VITE_API_URL}/users/question`, {
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