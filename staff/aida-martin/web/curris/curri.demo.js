import Curri from "./Curri.js";

const c = new Curri();

c[0] = "A";
c.length++;
c[1] = "B";
c.length++;
c[2] = "C";
c.length++;

//console.log(c)

//for (var i = 0; i < c.length; i++)
//    console.log(c[i])

console.log("FOREACH");
c.forEach((elem) => console.log(elem));

//
console.log(" ");
console.log("MAP + FOREACH");
const c2 = c.map((elem) => elem.toLowerCase());
c2.forEach((elem) => console.log(elem));

//
console.log(" ");
console.log("AT");

const c3 = new Curri();

c3[0] = 5;
c3.length++;
c3[1] = 12;
c3.length++;
c3[2] = 8;
c3.length++;
c3[3] = 130;
c3.length++;
c3[4] = 44;
c3.length++;

let index = 2;

console.log(`Using an index of ${index} the item returned is ${c3.at(index)}`);
// Expected output: "Using an index of 2 the item returned is 8"

index = -2;

console.log(`Using an index of ${index} item returned is ${c3.at(index)}`);
// Expected output: "Using an index of -2 item returned is 130"

//
console.log(" ");
console.log("CONCAT");

const c4 = new Curri();

c4[0] = "a";
c4.length++;
c4[1] = "b";
c4.length++;
c4[2] = "c";
c4.length++;

const c5 = new Curri();

c5[0] = "d";
c5.length++;
c5[1] = "e";
c5.length++;
c5[2] = "f";
c5.length++;

const c6 = c4.concat(c5);

console.log(c6);
// Expected output: Curri {"a", "b", "c", "d", "e", "f"}

//
console.log(" ");
console.log("EVERY");

const isBelowThreshold = (currentValue) => currentValue < 40;

const c7 = new Curri();

c7[0] = 1;
c7.length++;
c7[1] = 30;
c7.length++;
c7[2] = 39;
c7.length++;
c7[3] = 29;
c7.length++;
c7[4] = 10;
c7.length++;
c7[5] = 13;
c7.length++;

console.log(c7.every(isBelowThreshold));
// Expected output: true

const prueba = (element) => element > 10;

console.log(c7.every(prueba));
//EXTRA Expected output: false

const c8 = new Curri();

console.log(c8.every(isBelowThreshold));
//EXTRA Expected output: true

console.log(c8.every(prueba));
//EXTRA Expected output: true

//
console.log(" ");
console.log("FILL");

const c9 = new Curri();

c9[0] = 1;
c9.length++;
c9[1] = 2;
c9.length++;
c9[2] = 3;
c9.length++;
c9[3] = 4;
c9.length++;

// Fill with 0 from position 2 until position 4
console.log(c9.fill(0, 2, 4));
// Expected output: Curri {1, 2, 0, 0}

// Fill with 5 from position 1
console.log(c9.fill(5, 1));
// Expected output: Curri {1, 5, 5, 5}

console.log(c9.fill(6));
// Expected output: Curri {6, 6, 6, 6}

//EXTRAS:
console.log(c9.fill(0, -1));
// Expected output: Curri {6, 6, 6, 0}

console.log(c9.fill(0, 1, -1));
// Expected output: Curri {6, 0, 0, 0}

//
console.log(" ");
console.log("FILTER");

const c10 = new Curri();

c10[0] = "spray";
c10.length++;
c10[1] = "limit";
c10.length++;
c10[2] = "elite";
c10.length++;
c10[3] = "exuberant";
c10.length++;
c10[4] = "destruction";
c10.length++;
c10[5] = "present";
c10.length++;

const result = c10.filter((word) => word.length > 6);

console.log(result);
// Expected output: Curri {"exuberant", "destruction", "present"}

//
console.log(" ");
console.log("FIND");

const c11 = new Curri();

c11[0] = 5;
c11.length++;
c11[1] = 12;
c11.length++;
c11[2] = 8;
c11.length++;
c11[3] = 130;
c11.length++;
c11[4] = 44;
c11.length++;

const found = c11.find((element) => element > 10);

console.log(found);
// Expected output: 12

const found1 = c11.find((element) => element < 10);

console.log(found1);
//EXTRA Expected output: 5

const found2 = c11.find((element) => element === 10);

console.log(found2);
//EXTRA Expected output: undefined

//
console.log(" ");
console.log("FINDINDEX");

const c12 = new Curri();

c12[0] = 5;
c12.length++;
c12[1] = 12;
c12.length++;
c12[2] = 8;
c12.length++;
c12[3] = 130;
c12.length++;
c12[4] = 44;
c12.length++;

const isLargeNumber = (element) => element > 13;

console.log(c12.findIndex(isLargeNumber));
// Expected output: 3

const prueba2 = (element) => element < 13;

console.log(c12.findIndex(prueba2));
//EXTRA Expected output: 0

console.log(c12.findIndex((element) => element === 13));
//EXTRA Expected output: -1

//
console.log(" ");
console.log("INCLUDES");

const c13 = new Curri();

c13[0] = 1;
c13.length++;
c13[1] = 2;
c13.length++;
c13[2] = 3;
c13.length++;

console.log(c13.includes(2));
// Expected output: true

const c14 = new Curri();

c14[0] = "cat";
c14.length++;
c14[1] = "dog";
c14.length++;
c14[2] = "bat";
c14.length++;

console.log(c14.includes("cat"));
// Expected output: true

console.log(c14.includes("at"));
// Expected output: false

//
console.log(" ");
console.log("INDEXOF");

const c15 = new Curri();

c15[0] = "ant";
c15.length++;
c15[1] = "bison";
c15.length++;
c15[2] = "camel";
c15.length++;
c15[3] = "duck";
c15.length++;
c15[4] = "bison";
c15.length++;

console.log(c15.indexOf("bison"));
// Expected output: 1

// Start from index 2
console.log(c15.indexOf("bison", 2));
// Expected output: 4

console.log(c15.indexOf("giraffe"));
// Expected output: -1

console.log(c15.indexOf("camel", -3));
// Expected output: 2

//
console.log(" ");
console.log("ISARRAY");
console.log("---");

//
console.log(" ");
console.log("JOIN");

const c16 = new Curri();

c16[0] = "Fire";
c16.length++;
c16[1] = "Air";
c16.length++;
c16[2] = "Water";
c16.length++;

console.log(c16.join());
// Expected output: "Fire,Air,Water"

console.log(c16.join(""));
// Expected output: "FireAirWater"

console.log(c16.join("-"));
// Expected output: "Fire-Air-Water"

//
console.log(" ");
console.log("LASTINDEXOF");

const c17 = new Curri();

c17[0] = "Dodo";
c17.length++;
c17[1] = "Dog";
c17.length++;
c17[2] = "Tiger";
c17.length++;
c17[3] = "Penguin";
c17.length++;
c17[4] = "Dodo";
c17.length++;

console.log(c17.lastIndexOf("Dodo", -1));
// Expected output: 4

console.log(c17.lastIndexOf("Tiger"));
// Expected output: 2

//
console.log(" ");
console.log("POP");

const c18 = new Curri();

c18[0] = "broccoli";
c18.length++;
c18[1] = "cauliflower";
c18.length++;
c18[2] = "cabbage";
c18.length++;
c18[3] = "kale";
c18.length++;
c18[4] = "tomato";
c18.length++;

console.log(c18.pop());
// Expected output: "tomato"

console.log(c18);
// Expected output: Curri {"broccoli", "cauliflower", "cabbage", "kale"}

console.log(c18.pop());
// Expected output: "kale"

console.log(c18);
// Expected output: Curri {"broccoli", "cauliflower", "cabbage"}

//
console.log(" ");
console.log("PUSH");

const c19 = new Curri();

c19[0] = "pigs";
c19.length++;
c19[1] = "goats";
c19.length++;
c19[2] = "sheep";
c19.length++;

const count = c19.push("cows");
console.log(count);
// Expected output: 4
console.log(c19);
// Expected output: Curri {"pigs", "goats", "sheep", "cows"}

const count2 = c19.push("chickens", "cats", "dogs");
console.log(count2);
// Expected output: 7
console.log(c19);
// Expected output: Curri {"pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"}

//
console.log(" ");
console.log("REDUCE");

const c20 = new Curri();

c20[0] = 1;
c20.length++;
c20[1] = 2;
c20.length++;
c20[2] = 3;
c20.length++;
c20[3] = 4;
c20.length++;

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = c20.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);

console.log(sumWithInitial);
// Expected output: 10

// EXTRA:
const c21 = new Curri();

c21[0] = 1;
c21.length++;
c21[1] = 2;
c21.length++;
c21[2] = 3;
c21.length++;
c21[3] = 4;
c21.length++;
c21[4] = 5;
c21.length++;
c21[5] = 6;
c21.length++;
c21[6] = 7;
c21.length++;

const initialValue2 = 2;
const sumWithInitial2 = c21.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue2
);

console.log(sumWithInitial2);
// Expected output: 30

// EXTRA:
const c22 = new Curri();

c22[0] = 1;
c22.length++;
c22[1] = 2;
c22.length++;
c22[2] = 3;
c22.length++;
c22[3] = 4;
c22.length++;
c22[4] = 5;
c22.length++;
c22[5] = -6;
c22.length++;

const initialValue3 = -5;
const subtractionWithInitial = c22.reduce(
  (accumulator, currentValue) => accumulator - currentValue,
  initialValue3
);

console.log(subtractionWithInitial);
// Expected output: -14

// EXTRA:

const subtractionWithoutInitial = c22.reduce(
  (accumulator, currentValue) => accumulator - currentValue
);

console.log(subtractionWithoutInitial);
// Expected output: -7

//
console.log(" ");
console.log("REVERSE");

const c23 = new Curri();

c23[0] = "one";
c23.length++;
c23[1] = "two";
c23.length++;
c23[2] = "three";
c23.length++;
c23[3] = "four";
c23.length++;

console.log("Curri1:", c23);
// Expected output: "array1:" Curri {"one", "two", "three"}

const reversed = c23.reverse();
console.log("reversed:", reversed);
// Expected output: "reversed:" Curri {"three", "two", "one"}

// Careful: reverse is destructive -- it changes the original array.
console.log("Curri1:", c23);
// Expected output: "array1:" Curri {"three", "two", "one"}

//
console.log(" ");
console.log("SHIFT");

const c24 = new Curri();

c24[0] = "1";
c24.length++;
c24[1] = "2";
c24.length++;
c24[2] = "3";
c24.length++;

const firstElement = c24.shift();

console.log(c24);
// Expected output: Curri {2, 3}

console.log(firstElement);
// Expected output: 1

//
console.log(" ");
console.log("SLICE");

const c25 = new Curri();

c25[0] = "ant";
c25.length++;
c25[1] = "bison";
c25.length++;
c25[2] = "camel";
c25.length++;
c25[3] = "duck";
c25.length++;
c25[4] = "elephant";
c25.length++;

console.log(c25.slice(2));
// Expected output: Curri {"camel", "duck", "elephant"}

console.log(c25.slice(2, 4));
// Expected output: Curri {"camel", "duck"}

console.log(c25.slice(1, 5));
// Expected output: Curri {"bison", "camel", "duck", "elephant"}

console.log(c25.slice(-2));
// Expected output: Curri {"duck", "elephant"}

console.log(c25.slice(2, -1));
// Expected output: Curri {"camel", "duck"}

console.log(c25.slice(9));
// EXTRA Expected output: Curri {}

console.log(c25.slice(0, 9));
// EXTRA Expected output: Curri {"ant", "bison", "camel", "duck", "elephant"}

console.log(c25.slice());
// Expected output: Curri {"ant", "bison", "camel", "duck", "elephant"}

//
console.log(" ");
console.log("SOME");

const c26 = new Curri();

c26[0] = 1;
c26.length++;
c26[1] = 2;
c26.length++;
c26[2] = 3;
c26.length++;
c26[3] = 4;
c26.length++;
c26[4] = 5;
c26.length++;

// Checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(c26.some(even));
// Expected output: true

const even1 = (element) => element === 0;

console.log(c26.some(even1));
//EXTRA Expected output: false

const even2 = (element) => element === 1;

console.log(c26.some(even2));
//EXTRA Expected output: true

const c27 = new Curri();

const even3 = (element) => element === "";

console.log(c27.some(even3));
//EXTRA Expected output: false

// const c28 = new Curri();

// c28[0] = 1;
// c28.length++;
// c28[2] = 3;
// c28.length++;

// console.log(c28.some((x) => x === undefined));
// false

// const c29 = new Curri();

// c29[0] = 1;
// c29.length++;
// c29[2] = 1;
// c29.length++;

// console.log(c29);

// console.log(c29.some((x) => x !== 1));
// false

// console.log(some([1, undefined, 1], (x) => x !== 1)); // true

//
console.log(" ");
console.log("SPLICE");

// const c28 = new Curri(
//   "Jan",
//   "Feb",
//   "March",
//   "April",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December"
// );

// console.log(c28.splice(3, 5, "X", "Y", "Z"));
// Expected output: Curri {'April', 'June', 'July', 'August', 'September'}

// console.log(c28);
// Expected output: Curri {'Jan', 'Feb', 'March', 'X', 'Y', 'Z', 'October', 'November', 'December'}

// const c29 = new Curri("Jan", "Feb", "March", "April", "June", "July", "August");
// console.log(c29.splice(2, 4, "X", "Y"));
// Expected output: Curri  {'March', 'April', 'June', 'July'}
// console.log(c29);
// Expected output: Curri {'Jan', 'Feb', 'X', 'Y', 'August'}

// const c30 = new Curri(1, 2, 3, 5, 6);
// console.log(c30.splice(3, 0, 4));
// Expected output: []
// console.log(c30);
// Expected output: [1, 2, 3, 4, 5, 6]
