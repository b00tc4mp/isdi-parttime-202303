import { validators, errors } from 'com';
const { DuplicityError } = errors;
const { validatePassword } = validators;
import context from './context';

const updatePassword = (newPassword, repeatNewPassword, oldPassword) => {
    validatePassword(newPassword);
    validatePassword(oldPassword);
    validatePassword(repeatNewPassword)
    if (newPassword !== repeatNewPassword) throw new DuplicityError('password and confirmation password are not the same');
    if (oldPassword === newPassword) throw new DuplicityError('new password should be different than the old one');
    const data = { newPassword, oldPassword };

    return fetch(`${import.meta.env.VITE_API_URL}/api/users/password`, {
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
