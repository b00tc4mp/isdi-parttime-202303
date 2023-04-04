const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
// Expected output: true

function esSuficientementeGrande(elemento, indice, arrreglo) {
    return elemento >= 10;
}

console.log([12, 5, 8, 130, 44].every(esSuficientementeGrande));   // false
console.log([12, 54, 18, 130, 44].every(esSuficientementeGrande)); // true

console.log([12, 5, 8, 130, 44].every(elem => elem >= 10)); // false
console.log([12, 54, 18, 130, 44].every(elem => elem >= 10)); // true