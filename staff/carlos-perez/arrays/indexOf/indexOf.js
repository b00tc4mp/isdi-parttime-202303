function indexOf(array, index, startPosition) {
    const length = array.length;
    if (startPosition === undefined) {
        let position = -1;
        for (let i = 0; i < length; i++) {
            if (array[i] === index) {
                position = i;
                break;
            }
        }
        return position;
    }
    else {
        if ((startPosition > (length - 1)) || (startPosition < (-length))) {
            throw new Error("Posición de inicio fuera de rango");
        }
        if (startPosition < 0) {
            startPosition = length + startPosition;
        }
        let position = -1;
        for (let i = startPosition; i < length; i++) {
            if (array[i] === index) {
                position = i;
                break;
            }
        }
        return position;
    }

}