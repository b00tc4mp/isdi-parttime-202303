import { findPostById, findUserById } from '../data/data-managers';
import { saveUser } from '../data/data';
import { validators } from 'com';

const { validateCallback, validateId } = validators;

/**
 * Toggles a post into the favs of a user by their ids
 * 
 * @param {string} postId The post id
 * @param {string} userAuth The user id
 * @param {function} callback Function that controls the errors
 * 
*/
export const toggleFav = (postId, userAuth, callback) => {
    validateId(userAuth);
    validateId(postId);
    validateCallback(callback);

    const xhr = new XMLHttpRequest();

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
        callback(new Error('Connection error'));
    }

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}/favs`);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${userAuth}`);

    xhr.send();
}