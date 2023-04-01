function push(array, ...elements) {
    for (let element of elements) {
        array[array.length] = element;
    }
    return array.length;
}

function lastIndexOf(array, index, startPosition) {
    const length = array.length;
    const positions = [];
    if (startPosition === undefined) {
        for (let i = 0; i < length; i++) {
            if (array[i] === index) {
                push(positions, i);
            }
        }
        if (positions.length === 0) {
            return -1;
        }
        else {
            return positions[positions.length - 1];
        }
    }
    else {
        if ((startPosition > (length - 1)) || (startPosition < (-length))) {
            throw new Error("Posición de inicio fuera de rango");
        }
        if (startPosition < 0) {
            startPosition = length + startPosition;
        }
        for (let i = startPosition; i >= 0; i--) {
            if (array[i] === index) {
                push(positions, i);
            }
        }
        if (positions.length === 0) {
            return -1;
        }
        else {
            return positions[0];
        }
    }

}