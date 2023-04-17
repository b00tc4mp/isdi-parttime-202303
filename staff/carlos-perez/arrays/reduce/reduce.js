function reduce(array, callback, accumulator) {

    if (array.length === 0) {
        if (accumulator != undefined) {
            return accumulator;
        }
        else {
            throw new TypeError('Empty Array');
        }
    }
    if (array.length === 1) {
        return array[0];
    }

    if (array.length === 2) {
        return callback(array[0],array[1]);
    }

    for (let i of array) {
        accumulator = callback(accumulator, i);
    }
    return accumulator;
}
