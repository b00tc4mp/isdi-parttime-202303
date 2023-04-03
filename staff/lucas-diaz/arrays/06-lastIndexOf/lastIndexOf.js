/*
El método lastIndexOf() devuelve el último índice en el que un cierto elemento puede encontrarse en el arreglo, ó -1 si el elemento no se encontrara. El arreglo es recorrido en sentido contrario, empezando por el índice fromIndex.

arr.lastIndexOf(searchElement) arr.lastIndexOf(searchElement, fromIndex)

El índice en el que empieza la búsqueda en sentido contrario. Por defecto la longitud del arreglo menos uno (arr.length - 1), es decir, todo el arreglo será recorrido. Si el índice es mayor o igual que la longitud del arreglo, todo el arreglo será recorrido. Si es un valor negatigo, se usará como inicio del desplazamiento el final del arreglo. Darse cuenta que aún cuando el índice es negativo, el arreglo todavía será recorrido desde atrás hacia delante. Si el índice calculado es menor de 0, se devolverá -1, es decir, el arreglo no será recorrido.

El último índice del elemento en el arreglo; -1 si no se encuentra.

*/

const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log(animals.lastIndexOf('Dodo'));
// Expected output: 3

function lastIndexOf(array, elementToSearch, fromIndex = 0) {
    if (fromIndex > array.length) return -1;
    if (fromIndex < 0) {
        fromIndex = (array.length - (-fromIndex));
    }
    for (let i = array.length; i > 0; i--) {
        if (i < fromIndex) {
            continue;
        }
        if (array[i] === elementToSearch) {
            return i;
        }
    }
    return -1
}