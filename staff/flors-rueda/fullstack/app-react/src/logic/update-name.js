import { saveUser } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validators } from 'com';

const { validateCallback, validateId, validateName } = validators;

/**
 * Updates an user display name
 * 
 * @param {string} name The new name
 * @param {string} userId The user's id
 * @param {function} callback Function that controls the errors
 * 
 */
export default (name, userId, callback) => {
    validateName(name);
    validateId(userId);
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

    const data = { name };
    const json = JSON.stringify(data);

    xhr.send(json);
}