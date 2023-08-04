const { ContentError, FormatError } = require('./errors');
const { colors, avatars } = require('./assets');

const validateCallback = (callback) => {
    if (typeof callback !== 'function') throw new TypeError(`callback is not a function`);
}

const validateId = (id, explain) => {
    if (typeof id !== 'string') throw new TypeError(`${explain} is not a string`);
    if (!id.trim().length) throw new ContentError(`${explain} is empty`);
}

const validateName = (name) => {
    if (typeof name !== 'string') throw new TypeError('name is not a string');
    if (!name.trim().length) throw new ContentError('name is empty');
}

const validateFloor = (floor, isLastFloor) => {
    const startCount = floor.filter((item) => item === 'start').length;
    const holeCount = floor.filter((item) => item === 'hole').length;
    const stonksCount = floor.filter((item) => item === 'stonks').length;
    if (startCount !== 1) throw new ContentError('invalid start items');
    if (isLastFloor ? holeCount > 0 : holeCount !== 1) throw new ContentError('invalid hole items');
    if (isLastFloor ? stonksCount !== 1 : stonksCount > 0) throw new ContentError('invalid stonks items');
};

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

const validateHealth = (hp) => {
    if (typeof hp !== 'number') throw new TypeError('hp is not a number');
    if (hp <= 0 || hp > 7) throw new RangeError('invalid hp value');
}

const validateUsername = (username) => {
    if (typeof username !== 'string') throw new TypeError('username is not a string');
    if (!username.trim().length) throw new ContentError('username is empty');
    if (username.trim().length > 12) throw new RangeError('username is too long');
    const regexRule = /([^A-Za-z0-9])/;
    if (regexRule.test(username)) throw new FormatError('username format is incorrect');
}

const validatePassword = (password) => {
    if (typeof password !== 'string') throw new TypeError('password is not a string');
    if (password.trim().length < 8) throw new RangeError('password length lower than 8 characters');
}

const validateAvatar = (avatar) => {
    if (typeof avatar !== 'string') throw new TypeError('avatar is not a string');
    if (!avatar.trim().length) throw new ContentError('avatar is empty');
    if (!avatars.includes(avatar)) throw new ContentError('avatar is not included');
}

const validateColor = (color) => {
    if (typeof color !== 'string') throw new TypeError('color is not a string');
    if (!color.trim().length) throw new ContentError('color is empty');
    if (!colors.includes(color)) throw new ContentError('color is not included');
}

const validateRecoveryQuestion = (question) => {
    if (typeof question !== 'object') throw new TypeError('question is not an object');
    if (!question.question || !question.answer) throw new ContentError('missing question and/or answer');
    if (typeof question.question !== 'string' || typeof question.answer !== 'string') throw new TypeError('question and/or answer is not a string')
}

const validateRecoveryAnswer = (answer) => {
    if (typeof answer !== 'string') throw new TypeError('answer is not a string');
    if (!answer.trim().length) throw new ContentError('answer is empty');
}

const validateToken = (token) => {
    if (typeof token !== 'string') throw new TypeError(`token is not a string`)
    if (token.split('.').length !== 3) throw new ContentError(`token is not valid`)
}

module.exports = {
    validateName,
    validateCallback,
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
}