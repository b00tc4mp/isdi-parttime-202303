import { validators } from 'com';
import context from './context';
const { validateId } = validators;
import { extractSubFromToken } from './tokenUtils/tokenUtils';

/**
 * Creates a session for a given socket id using the provided API endpoint and authentication token.
 *
 * @param {string} socketId The id of the socket for which the session is being created.
 * @returns {Promise} A Promise that resolves when the session creation is successful.
 * @throws {Error} If there is an issue with the API request or the response status is not 201.
 */
const createSession = (socketId) => {
    validateId(socketId, 'socketId');

    return fetch(`${import.meta.env.VITE_API_URL}/session/${extractSubFromToken(context.token)}/${socketId}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
    })
        .then(res => {
            if (res.status !== 201) return res.json().then(({ error }) => { throw new Error(error) })
        })
}

export default createSession;