const array1 = ['one', 'two', 'three'];
reverse('array1:', array1);
// Expected output: "array1:" Array ["one", "two", "three"]

//const reversed = array1.reverse();

reverse('reversed:', array1, 'reversed');
// Expected output: "reversed:" Array ["three", "two", "one"]

// Careful: reverse is destructive -- it changes the original array.
reverse('array1:', array1);
// Expected output: "array1:" Array ["three", "two", "one"]
