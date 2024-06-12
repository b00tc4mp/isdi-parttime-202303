const array1 = [5, 12, 8, 130, 44];

const found = find(array1,element => element > 10);

console.log(found);

const inventario = [
    {nombre: 'manzanas', cantidad: 2},
    {nombre: 'bananas', cantidad: 0},
    {nombre: 'cerezas', cantidad: 5}
];

function esCereza(fruta) {
    return fruta.nombre === 'cerezas';
}

console.log(find(inventario,esCereza));

const inventario2 = [
    {nombre: 'manzanas', cantidad: 2},
    {nombre: 'bananas', cantidad: 0},
    {nombre: 'cerezas', cantidad: 5}
];

const resultado = find(inventario2, fruta => fruta.nombre === 'cerezas' );

console.log(resultado); // { nombre: 'cerezas', cantidad: 5 }