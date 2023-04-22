const array1 = ['a', 'b', 'c'];

array1.forEach(element => console.log(element));

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"

const words = ['uno', 'dos', 'tres', 'cuatro'];
words.forEach(function(word) {
  console.log(word);
  if (word === 'dos') {
    words.shift();
  }
});
// uno
// dos
// cuatro