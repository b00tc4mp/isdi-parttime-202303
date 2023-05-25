import splice from "./splice.mjs";

const months = ["jan", "March", "April", "june"]

splice(months, 1, 0, "Feb");
//Insert in idex 1
console.log(months);
//Expected output: ["jan", "Feb", "March", "April", "june"]