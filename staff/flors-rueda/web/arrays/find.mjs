export const find = (array, callback) => {
    for (const element of array) {
        if (callback(element)) return element
    }
}

