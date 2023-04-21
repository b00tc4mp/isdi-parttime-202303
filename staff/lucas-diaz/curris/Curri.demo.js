import { Curri } from "./curri.js";

let c = new Curri;

c[0] = "A"
c.length++
c[1] = "B"
c.length++
c[2] = "C"
c.length++

let c2 = new Curri;
c2[0] = "D"
c2.length++
c2[1] = "E"
c2.length++
c2[2] = "F"
c2.length++

/* console.log("-----PUSH-----")
c.push("D", "E", "F");
console.log(c);

console.log("-----POP-----")

console.log(c);    // Expected: {0: "A", 1: "B", 2: "C", length: 3}
console.log(c.pop()); // Expected : C (return de la function )

console.log("-----INCLUDES-----")
console.log(c.includes("A")) // Expected: true 
console.log(c.includes(6))  // Expected: false

console.log("-----AT-----")
console.log(c.at(1));  //Expected: "B"
console.log(c.at(-1));  //Expected: "C"

console.log("-----INDEXOF-----")
console.log(c.indexOf("B")); //Expected: 1
console.log(c.indexOf("C"));  //Expected: 2
console.log(c.indexOf("Baca")); //Expected: -1

console.log("-----LASTINDEXOF-----")
console.log(c.lastIndexOf("C")); // Expected: 3
console.log(c.lastIndexOf("Casa")); // Expected: -1

console.log("-----FILL-----")
console.log(c.fill(4));       // Expected: {0: 4, 1: 4, 2: 4, length: 3}
console.log(c.fill(4, 1));    // Expected: {0: "A", 1: 4, 2: 4, length: 3} 

console.log("-----CONCAT-----")
console.log(c.concat(c2));  

console.log("-----JOIN-----")

console.log(c.join("-"));

console.log("-----REVERSE-----")

console.log(c.reverse())*/


/* console.log("-----FOR EACH-----")
c.forEach(element => console.log(element))

console.log("-----MAP-----")
let cLower = c.map(element => element.toLowerCase());
cLower.forEach(element => console.log(element)); 

console.log("-----SOME-----")
let isSome = c.some(element => element === "A");
console.log(isSome);


console.log("-----EVERY-----")
let isEvery = c.every(element => typeof element === "string");
console.log(isEvery);

console.log("-----FIND-----")
console.log(c.find(element => element === "A"))

console.log("-----FINDINDEX-----")
console.log(c.findIndex(element => element === "A"))

*/