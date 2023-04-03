//
const slice = (array, sliceStart = 0, sliceEnd = false) => {
  let arrayResult = [],
    index = 0;

  sliceStart = sliceStart < 0 ? array.length + sliceStart : sliceStart;
  sliceEnd = sliceEnd < 0 ? array.length + sliceEnd : sliceEnd;

  for (let i = sliceStart; i < array.length; i++) {
    if (i !== sliceEnd) {
      arrayResult[index] = array[i];
      index++;
    }
  }
  const iterations = array.length - arrayResult.length;

  for (let i = 0; i < iterations; i++) {
    array[i] = arrayResult[i];
    array.length--;
  }
  return array;
};

let animals = ["ant", "bison", "camel", "duck", "elephant"];
console.log(slice(animals, 2));
// Expected output: Array ["camel", "duck", "elephant"]

animals = ["ant", "bison", "camel", "duck", "elephant"];
console.log(slice(animals, 2, 4));
// Expected output: Array ["camel", "duck"]

animals = ["ant", "bison", "camel", "duck", "elephant"];
console.log(slice(animals, 1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"]

animals = ["ant", "bison", "camel", "duck", "elephant"];
console.log(slice(animals, -2));
// Expected output: Array ["duck", "elephant"]

animals = ["ant", "bison", "camel", "duck", "elephant"];
console.log(slice(animals, 2, -1));
// Expected output: Array ["camel", "duck"]

animals = ["ant", "bison", "camel", "duck", "elephant"];
console.log(slice(animals));
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]
