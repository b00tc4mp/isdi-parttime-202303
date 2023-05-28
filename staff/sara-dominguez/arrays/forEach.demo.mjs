import forEach from "./forEach.mjs";

const array1 = ['a', 'b', 'c'];

forEach(array1, (element => console.log(element)))

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"

const words = ['uno', 'dos', 'tres', 'cuatro'];
forEach(words, (function(word) {
  console.log(word);
    if (word === 'dos') {
        words.shift();
    }
}))
// uno
// dos
// cuatro