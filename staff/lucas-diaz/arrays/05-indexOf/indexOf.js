/**
    El método indexOf() retorna el primer índice en el que se puede encontrar un elemento dado en el array, ó retorna -1 si el elemento no esta presente.

    array.indexOf(searchElement[, fromIndex])

 **Indica el índice por el que se comienza la búsqueda   
 **Por defecto es 0, por lo que se busca en todo el array  
 **Si el índice es mayor o igual a la longitud del array, devuelve -1 
 
 
 **Si el valor es negativo, se toma restando posiciones desde el final del array.  
 **aunque el índice sea negativo, la búsqueda seguirá realizándose en un orden incremental
 **Si el índice calculado es menor de 0, la búsqueda se realizará por todo el array.
 */

function indexOf(array, elementToSearch, fromIndex = 0){
    if (fromIndex > array.length) return -1;
    if (fromIndex < 0){
        fromIndex = (array.length - (-fromIndex));
    }
    for (let i = 0; i < array.length; i++){
        if (i < fromIndex){
            continue;
        }
        if (array[i] === elementToSearch){
            return i;
        }
    } 
    return -1
}


