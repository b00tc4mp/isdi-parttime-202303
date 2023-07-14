import { loadPosts, savePost } from '../../data.js'
import { context } from "../../ui.js";
import { validators } from 'com';

const { validateToken, validateText } = validators

export function editPost(token, postId, title, text, image, visibility) {
    //TODO hacer losgica para comprobar que el usario que quiere editar el post es el propietario
    validateToken(token)
    validateText(title)
    validateText(text)
    return fetch(`${import.meta.env.VITE_API_URL}/posts/update/${postId}`, {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, text, image, visibility })
    })
        .then(res => {
            if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })
        })
}