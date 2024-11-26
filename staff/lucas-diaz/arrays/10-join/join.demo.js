import join from "./join.js";


let ejemplo = ["Lucas", "Damian", "Diaz"];
let ejemplo3 = [];
let ejemplo4 = ["Loco"];
let ejemplo2 = [2, 3, 4];
let ejemplo5 = ["amigos", null, undefined, 6];

console.log(join(ejemplo));
console.log(join(ejemplo2, "-"));
console.log(join(ejemplo3));
console.log(join(ejemplo4, "-jey-"));
console.log(join(ejemplo5));
console.log(join(ejemplo, ""));



