import { validators, errors } from 'com'
import context from './context'

const { validateNewPostTitle, validateNewPostContent, validateSubject } = validators

/**
 * Creates a post from scratch with a text provided by the user.
 * 
 * @param {string} title The title of the post
 * @param {string} summary The summary content of the post
 * 
 * @returns {Promise} A Promise that resolves when a post is created successfully, or throws an error if the post creation fails
 * 
 * @throws {TypeError} On non-string conversation id or summary text
 * @throws {ContentError} On conversation id length not equal to 24 characters, or empty summary text
 */

export default function createPost(_title, _content, _subject) {
    validateNewPostTitle(_title)
    validateNewPostContent(_content)
    validateSubject(_subject)

    const title = _title.trim()
    const content = _content.trim()
    const subject = _subject.trim()

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/newPost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ title, content, subject })
        })

        if (res.status === 201)
            return

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)
    })()
}
