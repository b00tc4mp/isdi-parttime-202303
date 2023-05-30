import Curri from "./Curris.js";

const c1 = new Curri
c1[0]= 'Hola'
c1[2]= 'Adiós'
c1[1] = 'Saludos'
c1.length += 3
c1.forEach(element => console.log(element))


const c2 = new Curri
c2[0]= 2
c2[1] = 11
c2[2]= 5
c2.length += 3
console.log(c2.map(element => element * 2));


const c3 = new Curri
c3[0]= undefined
c3[1] = false
c3[2]= true
c3.length += 3
console.log(c3.at(2));


const c4 = new Curri
c4[0]= 2
c4[1] = 10
c4[2]= 5
c4.length += 3
console.log(c4.concat(3, 55, 0));


const c5 = new Curri
c5[0]= function(){}
c5[1] = 'Hola'
c5[2]= undefined
c5.length += 3
console.log(c5.every(element => isNaN(element)));


const c6 = new Curri
c6[0]= 2
c6[1] = 10
c6[2]= 5
c6[3]= 3
c6[4] = 19
c6[5]= 51
c6.length += 6
c6.fill(0, 2, 4)
console.log(c6);
c6.fill(1 ,3)
console.log(c6);
c6.fill(2)
console.log(c6);


const c7 = new Curri
c7[0]= 2
c7[1] = 10
c7[2]= 5
c7.length += 3
console.log(c7.filter(element => element < 10));


const c8 = new Curri
c8[0]= 'Hola'
c8[1] = 'Adeu'
c8[2]= 'Hasta luego'
c8[3]= 'Good bye'
c8[4] = 'Adiós'
c8[5]= 'Arrivederci'
c8.length += 6
console.log(c8.find(element => element.length > 7));


const c9 = new Curri
c9[0]= 'Hola'
c9[1] = 'Adeu'
c9[2]= 'Hasta luego'
c9[3]= 'Good bye'
c9[4] = 'Adios'
c9[5]= 'Arrivederci'
c9.length += 6
console.log(c9.findIndex(element => element.length === 5));


const c10 = new Curri
c10[0]= 'Hola'
c10[1] = 'Adeu'
c10[2]= 'Hasta luego'
c10[3]= 'Good bye'
c10[4] = 'Ciao'
c10[5]= 'Arrivederci'
c10.length += 6
console.log(c10.indexOf('Good bye'));
console.log(c10.indexOf('Adiós'));


const c11 = new Curri
c11[0]= true
c11[1] = null
c11[2]= undefined
c11.length += 3
console.log(c11.includes(undefined));
console.log(c11.includes('Hola'));


const c12 = new Curri
c12[0]= 'Hola'
c12[1] = 'Adeu'
c12[2]= 'Hasta luego'
c12[3]= 'Good bye'
c12[4] = 'Ciao'
c12[5]= 'Arrivederci'
c12.length += 6
console.log(c12.join(' - '));


const c13 = new Curri
c13[0]= 'Hola'
c13[1] = 'Adeu'
c13[2]= 'Hasta luego'
c13[3]= 'Good bye'
c13[4] = 'Ciao'
c13[5]= 'Arrivederci'
c13.length += 6
console.log(c13.lastIndexOf(element => element.length > 8));


const c14 = new Curri
c14[0]= 11
c14[1] = 12
c14[2]= 13
c14[3]= 14
c14[4] = 15
c14[5]= 16
c14.length += 6
const add = (a, b) => a + b;
console.log(c14.reduce(add, 10));


const c15 = new Curri
c15[0]= 'Hola'
c15[1] = 'Adeu'
c15[2]= 'Hasta luego'
c15[3]= 'Good bye'
c15[4] = 'Ciao'
c15[5]= 'Arrivederci'
c15.length += 6
c15.reverse()
console.log(c15);


const c16 = new Curri
c16[0]= 'Hola'
c16[1] = 'Adeu'
c16[2]= 'Hasta luego'
c16[3]= 'Good bye'
c16[4] = 'Ciao'
c16[5]= 'Arrivederci'
c16.length += 6
console.log(c16.slice(1, 4));


const c17 = new Curri
c17[0]= 'Hola'
c17[1] = 'Adeu'
c17[2]= 'Hasta luego'
c17[3]= 'Good bye'
c17[4] = 'Adiós'
c17[5]= 'Arrivederci'
c17.length += 6
console.log(c17.some(element => element.length === 5));
console.log(c17.some(element => element.length === 6));


const c18 = new Curri
c18[0]= 'Hola'
c18[1] = 'Adeu'
c18[2]= 'Hasta luego'
c18[3]= 'Good bye'
c18[4] = 'Ciao'
c18[5]= 'Arrivederci'
c18.length += 6
console.log(c18.splice(1, 2, 'Com esteu?'));
console.log(c18);


const c19 = new Curri
c19[0]= 'Hola'
c19[1] = 'Adeu'
c19[2]= 'Hasta luego'
c19[3]= 'Good bye'
c19[4] = 'Ciao'
c19[5]= 'Arrivederci'
c19.length += 6
console.log(c19.toReversed());


const c20 = new Curri
c20[0]= 'Hola'
c20[1] = 'Adeu'
c20[2]= 'Hasta luego'
c20[3]= 'Good bye'
c20[4] = 'Ciao'
c20[5]= 'Arrivederci'
c20.length += 6
const eliminated = c20.shift()
console.log(eliminated);
console.log(c20);


const c21 = new Curri
c21[0]= 'Hola'
c21[1] = 'Adeu'
c21[2]= 'Hasta luego'
c21[3]= 'Good bye'
c21[4] = 'Ciao'
c21[5]= 'Arrivederci'
c21.length += 6
console.log(c21.unshift('Bon dia', 'Com va?'));
console.log(c21);

const c22 = new Curri(10,20,30)
console.log(c22);

console.log(Curri.of(1,2,3));
