const { ContentError, FormatError } = require('./errors');
const { colors, avatars } = require('./assets');

/**
 * Validates any kind of id
 * 
 * @param {string} id The id
 * @param {string} explain The type of id
 * 
 * @throws {TypeError} if id is not a string
 * @throws {ContentError} if id is empty
 */
const validateId = (id, explain) => {
    if (typeof id !== 'string') throw new TypeError(`${explain} is not a string`);
    if (!id.trim().length) throw new ContentError(`${explain} is empty`);
}

/**
 * Validates a level's name
 * 
 * @param {string} name The name
 * 
 * @throws {TypeError} if name is not a string
 * @throws {ContentError} if name is empty
 */
const validateName = (name) => {
    if (typeof name !== 'string') throw new TypeError('name is not a string');
    if (!name.trim().length) throw new ContentError('name is empty');
}

/**
 * Validates a level's floor
 * 
 * @param {array} floor The level's floor
 * @param {boolean} isLastFloor In case it is indeed the last floor
 * 
 * @throws {ContentError} if has an incorrect number of starts, hole or stonks items
 */
const validateFloor = (floor, isLastFloor) => {
    const startCount = floor.filter((item) => item === 'start').length;
    const holeCount = floor.filter((item) => item === 'hole').length;
    const stonksCount = floor.filter((item) => item === 'stonks').length;
    if (startCount !== 1) throw new ContentError('invalid start items');
    if (isLastFloor ? holeCount > 0 : holeCount !== 1) throw new ContentError('invalid hole items');
    if (isLastFloor ? stonksCount !== 1 : stonksCount > 0) throw new ContentError('invalid stonks items');
};

/**
 * Validates a level's layout and the configuration of all its floors
 * 
 * @param {array} layout The level's layout
 * 
 * @throws {TypeError} if layout is not an array
 * @throws {RangeError} if layout has too many floors or is empty
 * @throws {TypeError} if any floor is not an array
 * @throws {RangeError} if any floor has length different to 9
 * @throws {TypeError} if any floor's item is not a string
 * @throws {ContentError} if any floor has an incorrect number of starts, hole or stonks items
 */
const validateLayout = (layout) => {
    if (!Array.isArray(layout)) {
        throw new TypeError('layout is not an array');
    }
    if (layout.length === 0 || layout.length > 100) {
        throw new RangeError('layout length should be between 1 and 100');
    }
    for (let i = 0; i < layout.length; i++) {
        const floor = layout[i]
        if (!Array.isArray(floor)) {
            throw new TypeError('floor is not an array');
        }
        if (floor.length !== 9) {
            throw new RangeError('floor length should be 9');
        }
        for (const item of floor) {
            if (typeof item !== 'string') {
                throw new TypeError('floor item is not a string');
            }
        }
        let isLastFloor = i + 1 === layout.length;
        validateFloor(floor, isLastFloor);
    }
};

/**
 * Validates the number of health assigned to a level
 * 
 * @param {number} hp The amount of health
 * 
 * @throws {TypeError} if hp is not a number
 * @throws {RangeError} if hp is equal or smaller than 0 or bigger than 7
 */
const validateHealth = (hp) => {
    if (typeof hp !== 'number') throw new TypeError('hp is not a number');
    if (hp <= 0 || hp > 7) throw new RangeError('invalid hp value');
}

/**
 * Validates a username
 * 
 * @param {string} username The username
 * 
 * @throws {TypeError} if username is not a string
 * @throws {ContentError} if username is empty
 * @throws {RangeError} if username is bigger than 11
 * @throws {FormatError} if username has anything besides A to Z letters and numbers
 */
const validateUsername = (username) => {
    if (typeof username !== 'string') throw new TypeError('username is not a string');
    if (!username.trim().length) throw new ContentError('username is empty');
    if (username.trim().length >= 12) throw new RangeError('username is too long');
    const regexRule = /([^A-Za-z0-9])/;
    if (regexRule.test(username)) throw new FormatError('username format is incorrect');
}

/**
 * Validates a password
 * 
 * @param {string} password The password
 * 
 * @throws {TypeError} if password is not a string
 * @throws {RangeError} if password is smaller than 8 characters
 */
const validatePassword = (password) => {
    if (typeof password !== 'string') throw new TypeError('password is not a string');
    if (password.trim().length < 8) throw new RangeError('password length lower than 8 characters');
}

/**
 * Validates an avatar
 * 
 * @param {string} avatar The color
 * 
 * @throws {TypeError} if avatar is not a string
 * @throws {ContentError} if avatar is empty or not a part of the available avatars
 */
const validateAvatar = (avatar) => {
    if (typeof avatar !== 'string') throw new TypeError('avatar is not a string');
    if (!avatar.trim().length) throw new ContentError('avatar is empty');
    if (!avatars.includes(avatar)) throw new ContentError('avatar is not included');
}

/**
 * Validates a color
 * 
 * @param {string} color The color
 * 
 * @throws {TypeError} if color is not a string
 * @throws {ContentError} if color is empty or not a part of the available colors
 */
const validateColor = (color) => {
    if (typeof color !== 'string') throw new TypeError('color is not a string');
    if (!color.trim().length) throw new ContentError('color is empty');
    if (!colors.includes(color)) throw new ContentError('color is not included');
}

/**
 * Validates a user's recovery question
 * 
 * @param {object} question The recovery question object
 * 
 * @throws {TypeError} if question is not an object
 * @throws {ContentError} if question or answer is missing
 * @throws {TypeError} if question or answer is not a string
 */
const validateRecoveryQuestion = (question) => {
    if (typeof question !== 'object') throw new TypeError('question is not an object');
    if (!question.question || !question.answer) throw new ContentError('missing question and/or answer');
    if (typeof question.question !== 'string' || typeof question.answer !== 'string') throw new TypeError('question and/or answer is not a string')
}

/**
 * Validates a user's recovery answer
 * 
 * @param {string} answer The recovery answer
 * 
 * @throws {TypeError} if answer is not a string
 * @throws {ContentError} if answer is empty
 */
const validateRecoveryAnswer = (answer) => {
    if (typeof answer !== 'string') throw new TypeError('answer is not a string');
    if (!answer.trim().length) throw new ContentError('answer is empty');
}

/**
 * Validates a user's access token
 * 
 * @param {string} token The access token
 * 
 * @throws {TypeError} if token is not a string
 * @throws {ContentError} if token format is invalid
 */
const validateToken = (token) => {
    if (typeof token !== 'string') throw new TypeError(`token is not a string`)
    if (token.split('.').length !== 3) throw new ContentError(`token is not valid`)
}

/**
 * Validates game data
 * 
 * @param {object} gameData The game data object
 * 
 * @throws {TypeError} if gameData is not an object
 * @throws {TypeError} if stonks, holes, bombs, or life is not a number
 */
const validateGameData = (gameData) => {
    const { stonks, holes, bombs, life } = gameData;
    if (typeof gameData !== 'object') throw new TypeError(`game data is not a object`);
    if (typeof stonks !== 'number') throw new TypeError(`stonks is not a number`);
    if (typeof holes !== 'number') throw new TypeError(`holes is not a number`);
    if (typeof bombs !== 'number') throw new TypeError(`bombs is not a number`);
    if (typeof life !== 'number') throw new TypeError(`life is not a number`);
}

/**
 * Validates create data for game creation
 * 
 * @param {object} createData The create data object
 * 
 * @throws {TypeError} if createData is not an object
 * @throws {TypeError} if bombs, life, or floors is not a number
 */
const validateCreateData = (createData) => {
    const { bombs, life, floors } = createData;
    if (typeof createData !== 'object') throw new TypeError(`create data is not a object`);
    if (typeof bombs !== 'number') throw new TypeError(`bombs is not a number`);
    if (typeof life !== 'number') throw new TypeError(`life is not a number`);
    if (typeof floors !== 'number') throw new TypeError(`floors is not a number`);
}
/**
 * Validates a customization credits value
 * 
 * @param {number} cc The customization credits value
 * 
 * @throws {TypeError} if cc is not a number
 * @throws {ContentError} if cc value smaller than 0
 */
const validateCC = (cc) => {
    if (typeof cc !== 'number') throw new TypeError(`cc is not a number`);
    if (cc < 0) throw new ContentError(`cc value is not correct`);
}

/**
 * Validates an operator
 * 
 * @param {string} operator The operator
 * 
 * @throws {TypeError} if operator is not a string
 * @throws {ContentError} if operator is not correct (+ or -)
 */
const validateOperator = (operator) => {
    if (typeof operator !== 'string') throw new TypeError(`operator is not a string`);
    if (operator !== '+' && operator !== '-') throw new ContentError(`operator not correct`);
}

/**
 * Validates the number of health assigned to a level
 * 
 * @param {number} page The page number
 * 
 * @throws {TypeError} if page is not a number
 * @throws {RangeError} if page is equal or smaller than 0
 */
const validatePage = (page) => {
    if (typeof page !== 'number') throw new TypeError('page is not a number');
    if (page <= 0) throw new RangeError('invalid page value');
}

/**
 * Validates a sorting option
 * 
 * @param {string} sort The sorting option
 * 
 * @throws {TypeError} if filter is not a number
 * @throws {RangeError} if filter is not in range
 */
const validateSort = (sort) => {
    if (typeof sort !== 'number') throw new TypeError(`sort criteria is not a number`);
    if (sort < 0 && sort > 2) throw new RangeError(`sort criteria not on range`);
}

module.exports = {
    validateName,
    validateId,
    validateLayout,
    validateHealth,
    validateUsername,
    validatePassword,
    validateAvatar,
    validateColor,
    validateRecoveryQuestion,
    validateRecoveryAnswer,
    validateToken,
    validateGameData,
    validateCreateData,
    validateCC,
    validateOperator,
    validatePage,
    validateSort
}