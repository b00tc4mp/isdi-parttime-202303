import { findUserbyId, loadPosts, loadUsers } from '../data'

/**
 * Returns all the posts of the database in reverse order
 * @param {string} userId user's id
 * @returns {Array} posts in reverse order
 */

export default function retrievePosts(userId, callback) {

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr
        if(status !== 200){
            const json = xhr.response
            const { error } = JSON.parse(json)

            callback(new Error(error))
            return
        }

        const json = xhr.response
        const { posts } = JSON.parse(json)
        callback(null, posts)
    }

    xhr.onerror = () => {
        callback(new Error('Connection error'))
    }

    xhr.open('GET', `http://localhost:4000/posts`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('authorization', `Bearer ${userId}`)

    xhr.send()
}