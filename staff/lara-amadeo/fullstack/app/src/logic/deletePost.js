import { savePostsInStorage, saveUsersInStorage, loadUsers, findUserbyId, loadPosts } from "../data";

/**
 * Deletes a post from the database
 * @param {string} token user's id
 * @param {string} postId post's id
 */

export default function deletePost(token, postId, callback) {

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr
        if (status !== 204) {
            const json = xhr.response
            const { error } = JSON.parse(json)

            callback(new Error(error))
            return
        }

        callback(null)
    }

    xhr.onerror = () => {
        callback(new Error('Connection error'))
    }

    xhr.open('DELETE', `http://localhost:4000/posts/delete/${postId}`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('authorization', `Bearer ${token}`)

    xhr.send()

}