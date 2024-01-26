import { saveUser } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validators } from 'com';

const { validateCallback, validateId, validatePassword } = validators;



/**
 * Updates an user password
 * 
 * @param {string} userAuth The user's id
 * @param {string} oldPassword The user's old password
 * @param {string} newPassword The user's new password
 * @param {string} repeatPassword The user's new password confirmation
 * @param {function} callback Function that controls the errors
 * 
 */
export default (userAuth, oldPassword, newPassword, repeatPassword, callback) => {
    validateId(userAuth);
    validatePassword(oldPassword);
    validatePassword(newPassword);
    validatePassword(repeatPassword);
    validateCallback(callback);

    const xhr = new XMLHttpRequest;

    xhr.onload = () => {
        const { status } = xhr

        if (status !== 204) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }

        callback(null)
    }

    xhr.onerror = () => {
        callback(new Error('Connection error'))
    }

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/password`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${userAuth}`)

    const data = { oldPassword, newPassword, repeatPassword }
    const json = JSON.stringify(data)

    xhr.send(json)
}