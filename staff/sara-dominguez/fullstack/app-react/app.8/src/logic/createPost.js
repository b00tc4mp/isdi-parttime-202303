console.debug('load create-post')

// import { validateId, validateUserAvatar, validateText, validateCallback } from "./helpers/validators.js"
import { validators } from 'com'
import { findUserById } from "../data.js"
import { loadPosts, savePosts } from "../data.js"

const { validateId, validatePostUrl, validateText, validateCallback } = validators

export default function createPost(userId, image, text, callback) {
    validateId(userId, 'user id')
    validatePostUrl(image, 'image url')
    validateText(text)
    validateCallback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr

        if (status !== 200) {
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

    xhr.open('POST', `${import.meta.env.VITE_API_URL}/posts`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

    const post = {
        image,
        text,
    }
    const json = JSON.stringify(post)

    xhr.send(json)

}











    //TODO steps
    //check user with userId exists
    //create post id
    //create post object and add author, image, text and date properties
    //add post to post array


//     findUserById(userId, user => {
//         if (!user) {
//             callback(new Error('user not found'))

//             return
//         }

//         let id = 'post-1'

//         loadPosts(posts => {
//             const lastPost = posts[posts.length - 1]

//             if (lastPost)
//                 id = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)

//             const post = {
//                 id,
//                 author: user.id,
//                 image,
//                 text,
//                 date: new Date(),
//                 likes: []
//             }
//             posts.push(post)
//             savePosts(posts, () => callback(null))
//         })
//     })
// }