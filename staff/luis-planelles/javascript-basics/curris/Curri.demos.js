import Curri from './Curri.js';

const c = new Curri();

c[0] = 'A';
c.length++;
c[1] = 'B';
c.length++;
c[2] = 'C';
c.length++;

const c2 = new Curri();

c2[0] = 'D';
c2.length++;
c2[1] = 'E';
c2.length++;
c2[2] = 'F';
c2.length++;

console.warn('forEach');

c.forEach((elem) => console.log(elem)); // A,B,C

console.warn('map');

const c3 = c.map((elem) => elem.toLowerCase());
c3.forEach((elem) => console.log(elem)); // a,b,c

console.warn('at');
console.log(c.at(1)); //B

console.warn('concat');
const c4 = c.concat(c2);
c4.forEach((elem) => console.log(elem)); // A,B,C,D,E,F

console.warn('every');

let numbers = new Curri();

numbers[0] = 1;
numbers.length++;
numbers[1] = 2;
numbers.length++;
numbers[2] = 3;
numbers.length++;

let result = numbers.every((number) => number < 4);
console.log(result); // true

result = numbers.every((number) => number > 4);
console.log(result); // false

console.warn('fill');

console.log(numbers.fill(0, 2, 4));
// Expected output: Array [1, 2, 0]

numbers[0] = 1;
numbers[1] = 2;
numbers[2] = 3;

console.log(numbers.fill(5, 1));
// Expected output: Array [1, 5, 5]

numbers[0] = 1;
numbers[1] = 2;
numbers[2] = 3;

console.log(numbers.fill(6));
// Expected output: Array [6, 6, 6]

console.warn('filter');

numbers[0] = 1;
numbers[1] = 2;
numbers[2] = 3;

result = numbers.filter((number) => number > 1);
console.log(result); // 2, 3;

console.warn('find');

numbers[0] = 1;
numbers[1] = 2;
numbers[2] = 3;

result = numbers.find((element) => element > 1);
console.log(result); // 2

console.warn('findIndex');

result = numbers.findIndex((element) => element > 1);
console.log(result); // 1

result = numbers.findIndex((element) => element > 4);
console.log(result); // -1
