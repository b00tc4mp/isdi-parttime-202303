import { loadPosts, savePosts } from '../data/data';
import { findUserById } from '../data/data-managers';
import { generateUUID } from './helpers/generateUUID';
import { validators } from 'com';

const { validateCallback, validateId, validatePostText } = validators;

/**
 * Creates a post by it's image and text.
 * 
 * @param {string} postImg The base64 string of the post image
 * @param {string} postText The post text
 * @param {string} authorId The user logged id
 * @param {function} callback Function that controls the errors
 * 
 */
export default (postImg, postText, authorId, callback) => {
    validateId(authorId);
    validatePostText(postText);
    validateCallback(callback);

    const xhr = new XMLHttpRequest;

    xhr.onload = () => {
        const { status } = xhr;

        if (status !== 201) {
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

    xhr.open('POST', `${import.meta.env.VITE_API_URL}/posts`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    const user = { postImg, postText, authorId };
    const json = JSON.stringify(user);

    xhr.send(json);
}
