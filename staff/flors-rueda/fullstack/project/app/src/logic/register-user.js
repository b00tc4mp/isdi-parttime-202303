import { validators, errors } from 'com';
const { DuplicityError } = errors;
const { validatePassword, validateColor, validateRecoveryQuestion, validateUsername } = validators;

/**
 * Registers a new user by sending their information to the API for creation.
 *
 * @param {string} username The desired username for the new user.
 * @param {string} password The password for the new user.
 * @param {string} repeatPassword The repeated password for confirmation.
 * @param {[object]} recoveryQuestions An array of recovery questions for the user.
 * @param {string} color The preferred color for the user (default: 'orange').
 * @throws {DuplicityError} If the password and confirmation password do not match.
 * @throws {Error} If the user registration request is unsuccessful.
 */
const registerUser = (username, password, repeatPassword, recoveryQuestions, color = 'orange') => {
    validateUsername(username);
    validatePassword(password);
    if (password !== repeatPassword) throw new DuplicityError('password and confirmation password are not the same');
    for (let question of recoveryQuestions) {
        validateRecoveryQuestion(question);
    };
    validateColor(color);

    const user = { username, password, color, recoveryQuestions };

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            if (res.status !== 201) return res.json().then(({ error }) => { throw new Error(error) })
        })
}

export default registerUser