var nombres = ['Rita', 'Pedro', 'Miguel', 'Ana', 'Vanesa'];

//Pruebas

//Start positivo, End positivo
console.log("Start positivo End positivo");
var resultado =slice(nombres,1,3);
console.log(resultado);

//Start positivo, End negativo
console.log("Start positivo End negativo");
resultado = slice(nombres,1,-1);
console.log(resultado);

//Start negativo, End positivo
console.log("Start negativo End positivo");
resultado = slice(nombres,-1,3);
console.log(resultado);

//Start negativo, End negativo
console.log("Start negativo End negativo");
resultado = slice(nombres,-1,-2);
console.log(resultado);

//Start indefinido, End indefinido
console.log("Start indefinido End indefinido");
resultado = slice(nombres);
console.log(resultado);

//Start indefinido
console.log("Start indefinido");
resultado =slice(nombres,undefined,3);
console.log(resultado);

//End indefinido
console.log("End indefinido");
resultado =slice(nombres,1);
console.log(resultado);

//Start fuera de rango positivo
console.log("Start fuera de rango positivo");
resultado =slice(nombres,6);
console.log(resultado);

//Start fuera de rango negativo
console.log("Start fuera de rango negativo");
resultado =slice(nombres,-6);
console.log(resultado);

//End fuera de rango positivo
console.log("End fuera de rango positivo");
resultado =slice(nombres,0,6);
console.log(resultado);

//End fuera de rango negativo
console.log("End fuera de rango negativo");
resultado =slice(nombres,0,-6);
console.log(resultado);