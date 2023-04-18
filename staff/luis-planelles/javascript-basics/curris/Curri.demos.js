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

console.warn('from');

let word = new Curri();
word[0] = 'foo';

console.log(word.from()); // f o o
console.log(numbers.from((x) => x + x)); // 2 4 6

console.warn('some');

const even = (element) => element % 2 === 0;

console.log(numbers.some(even)); // true

console.warn('includes');

console.log(numbers.includes(2)); // true
console.log(numbers.includes(4)); // false

console.warn('index-of');

console.log(numbers.indexOf(2)); // 1
console.log(numbers.indexOf(4)); // -1

console.warn('isArray');

const emptyArray = new Curri();

console.log(numbers.isArray()); // true
console.log(emptyArray.isArray()); // false

console.warn('join');

console.log(c.join()); // A,B,C
console.log(c.join('')); // ABC
console.log(c.join('-')); // A-B-C

console.warn('lastIndexOf');

const animals = new Curri();

animals[0] = 'Dodo';
animals.length++;
animals[1] = 'Tiger';
animals.length++;
animals[2] = 'Penguin';
animals.length++;
animals[3] = 'Dodo';
animals.length++;

console.log(animals.lastIndexOf('Dodo')); // 3
console.log(animals.lastIndexOf('Tiger')); // 1
console.log(animals.lastIndexOf('Duck')); // -1

console.warn('pop');

console.log(animals.pop());
console.log(animals);
console.log(animals.pop());
console.log(animals);

console.warn('push');

console.log(animals.push('tux'));
console.log(animals);
console.log(animals.push('Guido Van Rossum'));
console.log(animals);
