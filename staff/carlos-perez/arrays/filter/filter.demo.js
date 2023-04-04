const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = filter(words, word => word.length > 6);

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]

function isBigEnough(value) {
    return value >= 10;
}

const filtered = filter([12, 5, 8, 130, 44], isBigEnough);

console.log(filtered);
// filtered is [12, 130, 44]

const array = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

function isPrime(num) {
    for (let i = 2; num > i; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return num > 1;
}

console.log(filter(array, isPrime)); // [2, 3, 5, 7, 11, 13]