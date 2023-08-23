import { validators, errors } from 'com';
const { DuplicityError } = errors;
const { validatePassword, validateUsername } = validators;

/**
 * Recovers a user's password by updating it with a new password.
 *
 * @param {string} username The username of the user whose password is being recovered.
 * @param {string} newPassword The new password to set for the user.
 * @param {string} repeatNewPassword The repeated new password for confirmation.
 * @throws {DuplicityError} If the new password and confirmation password do not match.
 * @throws {Error} If the password recovery request fails.
 */
const recoverPassword = (username, newPassword, repeatNewPassword) => {
    validateUsername(username);
    validatePassword(newPassword);
    validatePassword(repeatNewPassword);
    if (newPassword !== repeatNewPassword) throw new DuplicityError('password and confirmation password are not the same');
    const data = { username, newPassword };

    return fetch(`${import.meta.env.VITE_API_URL}/users/recover`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to update password');
            }
            return Promise.resolve();
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

export default recoverPassword;
