import { saveUserInStorage, findUserbyId, findPostById } from "../data"

/**
 * Toggles save or unsave a post
 * @param {object} post a post
 * @param {string} userId user's id
 */
//toggle rename -> toggleSavePost
export default function toggleSavePost(postId, userId, callback){

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr
        if(status !== 201){
            const { response: json } = xhr
            const { error } = JSON.parse(json)
            callback(new Error(error))

            return
        }

        callback(null)
    }

    xhr.onerror = () => {
        callback(new Error(error))
    }

    xhr.open('PATCH', `http://localhost:4000/posts/save/${postId}`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('authorization', `Bearer ${userId}`)

    xhr.send()
}