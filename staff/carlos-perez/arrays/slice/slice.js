function simpleSlice(array, start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result[result.length] = array[i];
    }
    return result;
}

function slice(array, start, end) {
    const empty = [];
    if (array.length === 0) { //Si el array no tiene ningún elemento
        return array;
    }
    if (start === undefined && end === undefined) { //Si start y end no están definidos
        return array;
    }
    if ((end === 0) || (end < (-(array.length))) || (start > array.length) || (start === array.length)) {
        return empty;
    }
    if (start === undefined) {
        if (end > 0) { //Si end es positivo
            if (end > array.length) { //Si end es mayor que la longitud del array
                return simpleSlice(array, 0, array.length);
            }
            else { //Si end es menor o igual que la longitud del array
                return simpleSlice(array, 0, end);
            }
        }
        else { //Si end es negativo pero no menos que la longitud negativa del array
            return simpleSlice(array, 0, array.length + end);
        }
    }


    if (end === undefined) { //Si end es undefined
        if (start >= 0) {
            //Si start es 0 o positivo menor que la longitud del array
            return simpleSlice(array, start, array.length);
        }
        else if (start < 0) { //Si start es negativo
            if (start < (-array.length)) { //Si start es menor que la longitud del array negativo
                return simpleSlice(array, 0, array.length);
            }
            else { //Si start es negativo y mayor o igual que la longitud del array negativo
                return simpleSlice(array, array.length + start, array.length);
            }
        }
    }

    //Start y End están definidos
    if (start < 0) { //Si start es negativo
        if (start < (-array.length)) { //Si start es menos que la longitud del array negativo
            start = 0;
        }
        else { //Si start es negativo y mayor o igual que la longitud del array negativo
            start = array.length + start;
        }
    }
    if (end > array.length) { //Si end es mayor que la longitud del array
        end = array.length;
    }
    if (end < 0) { //Si end es negativo
        //Si end es mayor que la longitud negativa de array
        end = array.length + end;
    }

    return simpleSlice(array, start, end);
}