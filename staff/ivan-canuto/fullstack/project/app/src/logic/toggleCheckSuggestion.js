import { validators, errors } from "com";
import context from "./context";

const { validateId } = validators

/**
 * Sets and unsets a suggestion as checked
 * 
 * @param {string} suggestionId The suggestion id
 * 
 * @returns {Promise} A Promise that resolves when a a suggestion is set as checked/unchecked successfully, or throws an error if the operation fails
 * 
 * @throws {TypeError} On non-string suggestion id
 * @throws {ContentError} On suggestion id length not equal to 24 characters
 */

export default function toggleCheckSuggestion(suggestionId) {
    validateId(suggestionId, 'suggestion id')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/suggestions/${suggestionId}/check`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${context.token}`
            }
        })

        if (res.status === 200)
            return

        const { type, message } = await res.json()

        const clazz = errors[type]

        if (clazz) throw new clazz(message)
        else throw new type(message)
    })()
}