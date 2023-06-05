const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold)); //true

function esSuficientementeGrande(elemento, indice, arrreglo) {
    return elemento >= 10;
}

console.log(every([12, 5, 8, 130, 44],esSuficientementeGrande));   // false
console.log(every([12, 54, 18, 130, 44],esSuficientementeGrande)); // true

console.log(every([12, 5, 8, 130, 44],elem => elem >= 10)); // false
console.log(every([12, 54, 18, 130, 44],elem => elem >= 10)); // true