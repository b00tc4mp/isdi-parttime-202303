import { findPostById, findUserById } from '../data/data-managers';
import { savePost } from '../data/data';
import { validators } from 'com';

const { validateCallback, validateId, validatePostText } = validators;

/**
 * Edits the post text and image
 * 
 * @param {string} newText The post text
 * @param {string} newPostImg The base64 string of the post image
 * @param {string} postId The id of the post to edit
 * @param {string} userAuth The user logged id
 * @param {function} callback Function that controls the errors
 * 
 */
export default (newText, newPostImg, postId, userAuth, callback) => {
    validateId(postId);
    validateId(userAuth);
    validatePostText(newText);
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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}`);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${userAuth}`);

    const data = { newText, newPostImg };
    const json = JSON.stringify(data);

    xhr.send(json);
}