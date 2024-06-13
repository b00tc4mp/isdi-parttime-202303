import { validators, errors } from 'com'
import context from './context'
const { validateText } = validators
const { ContentError } = errors

/**
 * Updates the post with new data
 * 
 * @param {string} postId The post id
 * @param {string} title The post title
 * @param {string} content The post content
 * 
 * @returns {Promise} A Promise that resolves when a post is updated successfully, or throws an error if the operation fails
 * 
 * @throws {TypeError} On non-string user id, post id, title or content
 * @throws {ContentError} On user id or post id length not equal to 24 characters, or empty title or content
 */

export default function updateUserLocation(_location) {
    validateText(_location, 'user location')

    const location = _location.trim()
    
    if(location.length > 30) throw new ContentError('The location is too long.')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/location`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ location })
        })

        if (res.status === 204)
            return

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)
    })()
}