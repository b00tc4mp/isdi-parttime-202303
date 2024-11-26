import  map  from "./map.mjs";


var numbers = [1, 5, 10, 15];
var doubles = map(numbers, number => number * 2);

console.log(doubles);