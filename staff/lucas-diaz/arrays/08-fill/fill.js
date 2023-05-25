/*
?EXPLICACION
El método fill() cambia todos los elementos en un arreglo por un valor estático, desde el índice start (por defecto 0) hasta el índice end (por defecto array.length). Devuelve el arreglo modificado.
?SEMANTICA
arr.fill(value[, start = 0[, end = this.length]])
?ARGUMENTOS
*Valor con el que se va a rellenar el arreglo. (Nótese que todos los elementos en el arreglo tendrán este mismo valor).
*Índice inicial, por defecto 0.
*Índice final, por defecto this.length.
?VALOR DE RETORNO
El arreglo modificado, rellenado con valor.
?DESCRIPPCION
Si start es negativo, se interpreta como array.length + start.
Si end es negativo, se interpreta como array.length + end.
fill es genérico de forma intencional: no requiere que su valor this sea un objeto Array.
fill es un método mutador: modifica el arreglo sobre el que se invoca; no devuelve una copia de éste.
Si el primer parámetro es un objeto, copia su referencia y rellena el arreglo con referencias a dicho objeto.
*/

const array1 = [1, 2, 3, 4];

// Fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4));
// Expected output: Array [1, 2, 0, 0]

function fill(array, value, startIndex = 0, endIndex = array.length){
    
    if (startIndex < 0){
        startIndex = array.length + startIndex;
    }
    if (endIndex < 0){
        endIndex = array.length + endIndex;
    }

    for(let i = 0; i < array.length; i++){
        if (i > endIndex || i < startIndex) continue

        array[i] = value
    }
    return array
}



