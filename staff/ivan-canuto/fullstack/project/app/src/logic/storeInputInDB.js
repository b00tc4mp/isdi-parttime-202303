import { validators, errors } from "com";
import context from "./context";

const { validateId, validateUserInputObject } = validators

/**
 * Stores the user input object in database
 * 
 * @param {string} conversationId The conversation id 
 * @param {object} userInput The user input in an object with the role
 * 
 * @returns {Promise} A Promise that resolves when a user input is stored in database successfully, or throws an error if the operation fails
 * 
 * @throws {TypeError} On non-string conversation id, or non-object user input
 * @throws {ContentError} On conversation id length not equal to 24 characters
 */

export default function storeInputInDB(conversationId, userInput) {
    validateId(conversationId, 'conversation id')
    validateUserInputObject(userInput, 'user input')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/conversations/${conversationId}/userInput`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify(userInput)
        })

        if (res.status === 200)
            return

        const { type, message } = await res.json()

        const clazz = errors[type]

        if (clazz) throw new clazz(message)
        else throw new type(message)
    })()
}