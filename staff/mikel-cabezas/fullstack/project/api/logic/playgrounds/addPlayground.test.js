require('dotenv').config()
const fetch = require('node-fetch');

const { Playground } = require('../../data/models')
const context = require('../context')
const { validators: { validateUserId, validateText, validatePassword, validateCallback } } = require('com')

/**
 * 
 * @param {string*} userId 
 * @param {string*} name 
 * @param {string*} description 
 * @param {string<Array>*} sunExposition
 * @param {string<Array>*} elements
 * @param {string<Array>*} images
 * @param {string*} location 
 * @returns {Promise<Object>} returns a promise object contains de new post 
 * 
 * @throws {TypeError} on non-string id, image, title and text (sync)
 * @throws {ContentError} on empty id, image, title or text  (sync)
 * @throws {FormatError} wrong format on image (sync)
 */

module.exports = (token, userId, name, description, sunExposition, elements, images, location) => {
    validateUserId(userId)
    validateText(name)
    validateText(description)
    // token, name, description, sunExposition, elements, images, location

    // let mapsResponse

    return fetch(`https://maps-api.apple.com/v1/reverseGeocode?loc=${location}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token.accessToken}`,
        },
    })
        .then(res => {
            if (res.status !== 200)
                return res.json().then(({ error: message }) => { throw new Error(message) })
            return res.json()
        })
        .then(mapsResponse => {
            return Playground.create({
                author: userId,
                name: name,
                description: description,
                sunExposition: sunExposition,
                elements: elements,
                images: images,
                location: {
                    coordinates: location,
                    // dateCreated: Date.now,
                    visibility: 'public',
                    city: mapsResponse.results[0].structuredAddress.locality,
                    street: mapsResponse.results[0].structuredAddress.fullThoroughfare,
                    state: mapsResponse.results[0].structuredAddress.administrativeArea,
                    country: mapsResponse.results[0].country
                }
            })
        })
    // .then(() => { })
}