function some(array, callback) {
    if (array.length === 0) {
        return false;
    }

    for (const property in array) { //Para que no de problemas con los vacíos de los Array
        if (callback(array[property])) {
            return true;
        }
    }
    return false;
}
