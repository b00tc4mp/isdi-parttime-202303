console.debug('load retrievePost')

// const { validateId } = require('com')
import { validators } from 'com'

const { validateToken, validateId } = validators


export function retrievePost(token, postId, callback) {
    validateToken(token)
    validateId(postId)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr

        if (status !== 200) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }
        const { response: json } = xhr
        const post = JSON.parse(json)

        callback(null, post)
    }

    xhr.onerror = () => {
        callback(new Error('conection error'))
    }

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts/${postId}`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)


    xhr.send()



}


// import { validateId, validateCallback} from "./helpers/validators.js"
// import { loadUsers, findPostById } from "../data.js"
// import { validators } from 'com'

// const {validateId, validateCallback} = validators

// export default function retrievePost(userId, postId, callback) {
//     validateId(userId)
//     validateId(postId)
//     validateCallback(callback)

//     loadUsers(users => {
//         users.some(user => user.id === userId)

//         if (!users) {
//             callback(new Error(`User with ${userId} not found`))

//             return
//         }

//         findPostById(postId, post => {
//             if (!post) {
//                 callback(new Error(`User with ${postId} not found`))

//                 return
//             }

//             callback(null, post)

//         })
//     })
// }