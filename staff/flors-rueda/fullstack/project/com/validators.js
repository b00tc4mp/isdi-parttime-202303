const { ContentError } = require('./errors');

const validateCallback = (callback) => {
    if (typeof callback !== 'function') throw new TypeError(`callback is not a function`);
}

const validateId = (id) => {
    if (typeof id !== 'string') throw new TypeError(`id is not a string`);
    if (!id.trim().length) throw new ContentError(`id is empty`);
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


module.exports = {
    validateName,
    validateCallback,
    validateId,
    validateLayout
}