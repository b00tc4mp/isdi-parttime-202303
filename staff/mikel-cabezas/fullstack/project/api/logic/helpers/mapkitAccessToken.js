require('dotenv').config()
const fetch = require('node-fetch');

const { validators: { validateToken } } = require('com')

/**
 * 
 * @param {string*} token 

 * @returns {Promise<Object>} returns a promise object contains de new post 
 * 
 * // @throws {TypeError} on non-string id, image, title and text (sync)
 * // @throws {ContentError} on empty id, image, title or text  (sync)
 * // @throws {FormatError} wrong format on image (sync)
 */

module.exports = () => {
    // token, name, description, sunExposition, elements, images, location
    const token = process.env.AMK_API_KEY

    return fetch(`https://maps-api.apple.com/v1/token`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then(res => {
            if (res.status !== 200) {
                return res.json().then(({ error: message }) => { throw new Error(message) })
            }
            return res.json()
        })
}