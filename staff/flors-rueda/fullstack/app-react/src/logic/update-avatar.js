import { saveUser } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validators } from 'com';

const { validateCallback, validateId } = validators;


/**
 * Update the avatar
 * 
 * @param {string} newSrc The new image url or base64 string
 * @param {string} userAuth The user id
 * @param {function} callback Function that controls the errors
 * 
*/
export default (newSrc, userAuth, callback) => {
    validateId(userAuth);
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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/avatar`);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${userAuth}`);

    const data = { newSrc };
    const json = JSON.stringify(data);

    xhr.send(json);
}