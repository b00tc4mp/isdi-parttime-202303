/*
El método concat() se usa para unir dos o más arrays. Este método no cambia los arrays existentes, sino que devuelve un nuevo array.
?SINTAXIS
var nuevo_array = viejo_array.concat(valor1[, valor2[, ...[, valorN]]])
?PARAMETROS
Arrays y/o valores a concatenar en el nuevo array. Ver la descripción posterior para más detalles.
?VALOR DEVUELTO 
Un nuevo array

El método concat crea un nuevo array que consta de los elementos del objeto que lo llama, seguido, en orden de ingreso, por los elementos de cada parámetro (en caso de que el parámetro sea un array), o el parámetro mismo (en caso de que no sea un array). No se aplica de forma recursiva a parámetros con arreglos anidados.

El método concat no altera this el array original, ni ninguno de los que fueron ingresados como parámetros, sino que devuelve una copia superficial que contiene copias de los mismos elementos de los arrays originales combinados. Los elementos de los arrays originales son copiados en el nuevo array de la siguiente manera:

Referencias a Objetos (no el objeto real): concat copia las referencias de objetos en el nuevo array. Ambos, el array original y el nuevo refieren al mismo objeto. Es decir, si un objeto referenciado es modificado, los cambios serán visibles tanto en el array nuevo como en el antiguo.
Tipo de de datos como cadenas, números y boleanos (no objetos String, Number o Boolean objects): concat copia los valores de los strings y numeros en el nuevo array.
*/

const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];


function concat(arr,...values){
    let newArray = [];
    
    for (let value of values){
        newArray = [...arr, ...value];
    }
    
    return newArray
}

