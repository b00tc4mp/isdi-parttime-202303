import some from './some.mjs'

const array = [1, 2, 3, 4, 5]

// Checks whether an element is even
const even = (element) => element % 2 === 0
const isBiggerThan10 = (element) => element > 10


some(array, even)
// Expected output: true

some(array, isBiggerThan10)
// Expected output: false


