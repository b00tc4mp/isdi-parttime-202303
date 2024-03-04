const { ContentError } = require('./errors')

/**
 * Validates an email
 * @param {string} email an email
 */

function validateEmail(email, explain = "email") {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (typeof email !== 'string') throw new TypeError(`${explain} must be a string`)
    if (!email.trim().length) throw new ContentError(`${explain} is blank`)
    if (!emailRegex.test(email)) throw new ContentError(`${email}, is not an ${explain}.`)
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

function validateEuroPrice(price, explain = "price") {
    // This regex assumes a price in euro format like "123,45"
    const euroPriceRegex = /^\d+,\d{2}$/;
    if (typeof price === 'number') {
        // If the input is a number, convert it to a string
        price = price.toString();
    }
    if (typeof price !== 'string') throw new TypeError(`${explain} must be a string`);
    if (!price.trim().length) throw new ContentError(`${explain} is blank`);
    if (!euroPriceRegex.test(price)) throw new ContentError(`${explain} is not a valid price`);
}


const fs = require('fs');

function validateFileUpload(fileInfo, explain = 'file') {
    if (!fileInfo) {
        throw new Error(`${explain} is missing`);
    }

    if (!fileInfo.filePath || !fileInfo.fileName) {
        throw new Error(`${explain} is invalid`);
    }

    const stats = fs.statSync(fileInfo.filePath);
    const fileSizeInBytes = stats.size;
    const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

    if (fileSizeInMegabytes > 25) {
        throw new Error(`${fileInfo.fileName} exceeds the maximum file size of 25 MB`);
    }

    // Supported file extensions for video, audio, and image formats
    const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.mkv'];
    const audioExtensions = ['.mp3', '.wav', '.ogg', '.flac'];
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];

    const fileExtension = fileInfo.fileName.split('.').pop().toLowerCase();

    if (
        !videoExtensions.includes(fileExtension) &&
        !audioExtensions.includes(fileExtension) &&
        !imageExtensions.includes(fileExtension)
    ) {
        throw new Error(`${fileInfo.fileName} must be a video, audio, or image file`);
    }

}

module.exports = validateFileUpload;

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
    validateIpGeoLocation,
    validateEuroPrice,
    validateFileUpload
}