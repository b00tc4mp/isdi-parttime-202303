import { validators } from 'com';

const { validateCallback, validateId } = validators;

const retrieveLevel = (id, callback) => {
    validateCallback(callback);
    validateId(id);

    const xhr = new XMLHttpRequest()

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
        callback(new Error('Connection error'))
    }

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/levels/${id}`)

    xhr.send()
}

export default retrieveLevel