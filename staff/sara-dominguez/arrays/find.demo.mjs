import find from "./find.mjs";

// caso 1
const array1 = [5, 12, 8, 130, 44];
const callback = (element => element > 10)

const found = find(array1, callback);

console.log(found);
// Expected output: 12

// caso 2  encontrar un objeto en un array por una de sus propiedades

const inventario = [
    {nombre: 'manzanas', cantidad: 2},
    {nombre: 'bananas', cantidad: 0},
    {nombre: 'cerezas', cantidad: 5}
];

const callback2 = function esCereza(fruta) {
    return fruta.nombre === 'cerezas';
}

console.log(find(inventario, callback2));
// { nombre: 'cerezas', cantidad: 5 }

// caso 3 con funciones flecha

const result = find(inventario, ((fruta) => fruta.nombre === 'cerezas'))

console.log(result)