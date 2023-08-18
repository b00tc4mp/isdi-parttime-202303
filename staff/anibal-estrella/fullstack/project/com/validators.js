const { ContentError } = require('./errors')

/**
 * Validates an email
 * @param {string} email an email
 */

function validateEmail(email, explain = "email") {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (typeof email !== 'string') throw new TypeError(`${explain} must be a string`)
    if (!email.trim().length) throw new ContentError(`${explain} is blank`)
    if (!emailRegex.test(email)) throw new ContentError(`${explain} is not an email`)

}

/**
 * validates a password
 * @param {string} password the password
 * @param {string} explain alternative edescription in case of error
 */
function validatePassword(password, explain = "password") {
    if (typeof password !== 'string') throw new TypeError(`${explain} must be a string`)
    if (password.trim().length < 8) throw new RangeError(`The ${explain} must be more than 8 characters long`)
}

/**
 * validates a name
 * @param {string} name the name
 */
function validateName(name, explain = "name") {
    if (typeof name !== 'string') throw new TypeError(`${explain} must be a string`)
    if (!name.trim().length) throw new ContentError(`${explain} is blank`)
}
/**
 * validates a name
 * @param {string} nickName the user's nick name
 */
function validateNickName(name, explain = "nickName") {
    if (typeof name !== 'string') throw new TypeError(`${explain} must be a string`);
    if (!name.trim().length) throw new Error(`${explain} is blank`);
    const regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(name)) throw new Error(`${explain} should be a single word without symbols and can contain numbers`);
}

/**
 * validates a city
 * @param {string} city the city
 */
function validateCity(city, explain = "city") {
    if (typeof city !== 'string') throw new TypeError(`${explain} must be a string`)
    if (!city.trim().length) throw new ContentError(`${explain} is blank`)
}

/**
 * 
 * @param {string} url an URL
 * @param {string} explain alternative edescription in case of error
 */
function validateUrl(url, explain = 'URL') {
    if (typeof url !== 'string') throw new TypeError(`${explain} must be a string`)
    if (!url.trim().length) throw new ContentError(`${explain} is empty`)
}

const HEX_DICTIONARY = '0123456789abcdef'

function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new TypeError(`${explain} is ${typeof id} and must be a string`)
    if (id.trim().length !== 24) throw new ContentError(`${explain} doesn't have 24 characters`)
    for (let i = 0; i < id.length; i++) {
        const char = id[i];

        if (!HEX_DICTIONARY.includes(char)) throw new ContentError(`${explain} is not a hexadecimal`)

    }

}

function validateText(text, explain = 'text') {
    if (text.length < 1) throw new Error(`${explain} must be longer than one character'`)
    if (typeof text !== 'string') throw new TypeError(`${explain} must be a string`)
    if (!text.trim().length) throw new ContentError(`${explain} is blank`)
}

function validateCallback(callback, explain = "callback") {
    if (typeof callback != 'function') throw new Error(`${explain} must be a function`)
}
function validateToken(token, explain = 'token') {
    if (typeof token !== 'string') throw new TypeError(`${explain} is ${typeof id} and must be a string`)
    if (token.split('.').length != 3) throw new ContentError(`${explain} is not `)
}
function validateIpGeoLocation(ipGeoLocationCoordinates, explain = 'ipGeoLocation') {
    if (!Array.isArray(ipGeoLocationCoordinates)) throw new TypeError(`${explain} must be an array`);

    if (ipGeoLocationCoordinates.length !== 2) throw new ContentError(`${explain} must contain exactly two values (latitude and longitude)`);

    const [latitude, longitude] = ipGeoLocationCoordinates;

    if (typeof latitude !== 'number' || latitude < -90 || latitude > 90) {
        throw new ContentError(`${explain} contains an invalid latitude`);
    }

    if (typeof longitude !== 'number' || longitude < -180 || longitude > 180) {
        throw new ContentError(`${explain} contains an invalid longitude`);
    }
}




module.exports = {
    validatePassword,
    validateEmail,
    validateName,
    validateNickName,
    validateUrl,
    validateId,
    validateText,
    validateCallback,
    validateCity,
    validateToken,
    validateIpGeoLocation
}