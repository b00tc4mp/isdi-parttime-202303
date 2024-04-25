export const every = (array, callback) => {
    for (const i in array) {
        if (!callback(array[i])) return false
    }

    return true
};