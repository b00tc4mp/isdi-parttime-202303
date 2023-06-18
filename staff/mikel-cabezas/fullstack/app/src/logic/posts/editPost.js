import { loadPosts, savePost } from '../../data.js'
import { context } from "../../ui.js";
import { validators } from 'com';

const { validateUserId, validateText } = validators

export function editPost(userId, postId, title, text, image, visibility, callback) {
    //TODO hacer losgica para comprobar que el usario que quiere editar el post es el propietario

    const xhr = new XMLHttpRequest
    xhr.onload = () => {
        const { status } = xhr
        debugger
        if (status !== 204) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }
        callback(null)
    }
    xhr.onerror = () => {
        callback(new Error('connection error'))
    }
    xhr.open("PATCH", `${import.meta.env.VITE_API_URL}/posts/update/${postId}`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)


    const post = { postId, title, text, image, visibility }
    const json = JSON.stringify(post)

    xhr.send(json)
}