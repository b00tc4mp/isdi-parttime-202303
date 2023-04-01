function isArray(object) {
    let result = object && (object.constructor == Array);
    if (result === undefined) {
        return false;
    }
    else {
        return object && (object.constructor == Array);
    }
}