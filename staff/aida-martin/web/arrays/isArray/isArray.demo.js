console.log(isArray([1, 2, 3])); // true
console.log(isArray({ foo: 123 })); // false
console.log(isArray("foobar")); // false
console.log(isArray(undefined)); // false

console.log("------------------");

console.log(isArray([])); // true
console.log(isArray([1])); // true
console.log(isArray(new Array())); // true
console.log(isArray(new Array("a", "b", "c", "d"))); // true
console.log(isArray(new Array(3))); // true
console.log(isArray(Array.prototype)); // true

console.log("------------------");

console.log(isArray()); // false
console.log(isArray({})); // false
console.log(isArray(null)); // false
console.log(isArray(undefined)); // false
console.log(isArray(17)); // false
console.log(isArray("Array")); // false
console.log(isArray(true)); // false
console.log(isArray(false)); // false
console.log(isArray({ __proto__: Array.prototype })); // false (me da true))

console.log({ __proto__: Array.prototype }); //" "
