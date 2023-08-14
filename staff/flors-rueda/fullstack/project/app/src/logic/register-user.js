import { validators, errors } from 'com';
const { DuplicityError } = errors;
const { validatePassword, validateColor, validateRecoveryQuestion, validateUsername } = validators;

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