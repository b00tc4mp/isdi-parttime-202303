import { saveUser } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validators } from 'com';

const { validateCallback, validateId, validatePassword } = validators;



/**
 * Updates an user password
 * 
 * @param {string} userId The user's id
 * @param {string} oldPassword The user's old password
 * @param {string} newPassword The user's new password
 * @param {string} repeatPassword The user's new password confirmation
 * @param {function} callback Function that controls the errors
 * 
 */
export default (userId, oldPassword, newPassword, repeatPassword, callback) => {
    validateId(userId);
    validatePassword(oldPassword);
    validatePassword(newPassword);
    validatePassword(repeatPassword);
    validateCallback(callback);

    const xhr = new XMLHttpRequest;

    xhr.onload = () => {
        const { status } = xhr;

        if (status !== 204) {
            const { response: json } = xhr;
            const { error } = JSON.parse(json);

            callback(new Error(error));

            return;
        }

        callback(null);
    }

    xhr.onerror = () => {
        callback(new Error('connection error'));
    }

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/${userId}/name`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    const data = { oldPassword, newPassword, repeatPassword };
    const json = JSON.stringify(data);

    xhr.send(json);
}