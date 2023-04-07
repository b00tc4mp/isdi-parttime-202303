const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

lastIndexOf('Dodo', [,], ...animals);
// Expected output: 3

lastIndexOf('Tiger', [,], ...animals);

lastIndexOf('Mikel', [,], ...animals);
// Expected output: -1

lastIndexOf(NaN, [,], ...animals);
// Expected output: -1
