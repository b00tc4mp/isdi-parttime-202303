import { loadPosts, loadUsers, savePosts } from '../../data.js'
import { validators } from 'com';

const { validateUserId } = validators

export function deletePost(userId, postId, callback) {

    const xhr = new XMLHttpRequest
    xhr.onload = () => {
        const { status } = xhr

        if (status !== 204) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }

        callback(null, posts)
    }
    xhr.onerror = () => {
        callback(new Error('connection error'))
    }
    xhr.open('DELETE', `${import.meta.env.VITE_API_URL}/posts/${postId}`)
    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

    xhr.send()
}