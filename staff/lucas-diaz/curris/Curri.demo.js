import Curri from "./Curri.js"

var c = new Curri;

c[0] = "A"
c.length++
c[1] = "B"
c.length++
c[2] = "C"
c.length++

consol
console.log("-----FOR EACH-----")
c.forEach(element => console.log(element))

console.log("-----MAP-----")
let cLower = c.map(element => element.toLowerCase());
cLower.forEach(element => console.log(element));