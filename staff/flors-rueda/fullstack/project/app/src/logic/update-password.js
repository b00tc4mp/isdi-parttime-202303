import { validators, errors } from 'com';
const { DuplicityError } = errors;
const { validatePassword } = validators;
import context from './context';

/**
 * Updates the user's password.
 *
 * @param {string} newPassword The new password to set.
 * @param {string} repeatNewPassword The repeated new password to confirm.
 * @param {string} oldPassword The old password for verification.
 * @returns {Promise} A promise that resolves when the password is updated successfully.
 * @throws {Error} If the request to update the password fails.
 * @throws {DuplicityError} If the new password and the repeated new password do not match, or if the new password is the same as the old password.
 */
const updatePassword = (newPassword, repeatNewPassword, oldPassword) => {
    validatePassword(newPassword);
    validatePassword(oldPassword);
    validatePassword(repeatNewPassword)
    if (newPassword !== repeatNewPassword) throw new DuplicityError('password and confirmation password are not the same');
    if (oldPassword === newPassword) throw new DuplicityError('new password should be different than the old one');
    const data = { newPassword, oldPassword };

    return fetch(`${import.meta.env.VITE_API_URL}/users/password`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${context.token}`
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

export default updatePassword;
