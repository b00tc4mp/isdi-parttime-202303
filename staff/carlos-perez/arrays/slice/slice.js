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
    if (start === undefined && end === undefined) { //Si start y end están definidos
        return array;
    } else if (start === undefined) { //Si start es undefined
        if (end > 0) { //Si end es positivo
            if (end > array.length) { //Si end es mayor que la longitud del array
                return simpleSlice(array, 0, array.length);
            }
            else { //Si end es menor o igual que la longitud del array
                return simpleSlice(array, 0, end);
            }
        } else if (end === 0) { //Si end es cero
            return empty;
        }
        else { //Si end es negativo
            if (end < (-(array.length))) { //Si end es menor que la longitud negativa del array
                return empty;
            }
            else { //Si end es negativo pero no menos que la longitud negativa del array
                return simpleSlice(array, 0, array.length + end);
            }
        }
    } else if (end === undefined) { //Si end es undefined
        if (start >= 0) { //Si start es 0 o positivo
            if (start > array.length) { //Si start es mayor que la longitud del array
                return empty;
            } else if (start === array.length) { //Si start es igual que la longitud del array
                return empty;
            }
            else { //Si start es 0 o positivo menor que la longitud del array
                return simpleSlice(array, start, array.length);
            }
        }
        else if(start<0) { //Si start es negativo
            if(start<(-array.length)){ //Si start es menor que la longitud del array negativo
                return simpleSlice(array, 0, array.length);
            }
            else{ //Si start es negativo y mayor o igual que la longitud del array negativo
                return simpleSlice(array,array.length+start,array.length);
            }
        }
    }
    else{ //Si start y end están definidos
        if(start<0){ //Si start es negativo
            if(start<(-array.length)){ //Si start es menos que la longitud del array negativo
                start=0;
            }
            else{ //Si start es negativo y mayor o igual que la longitud del array negativo
                start=array.length+start;
            }
        }
        if (start > array.length) { //Si start es mayor que la longitud del array
            return empty;
        }
        if(end===0){ // Si end es 0
            return empty;
        }
        if (end > array.length){ //Si end es mayor que la longitud del array
            end=array.length;
        }
        if(end<0){ //Si end es negativo
            if(end<(-array.length)){ //Si end es menor que la longitud negativa del array
                return empty;
            }
            else{ //Si end es mayor que la longitud negativa de array
                end=array.length+end;
            }
        }
        return simpleSlice(array, start, end);
    }
}

var nombres = ['Rita', 'Pedro', 'Miguel', 'Ana', 'Vanesa'];
var masculinos = simpleSlice(nombres,1,3);
console.log(masculinos);