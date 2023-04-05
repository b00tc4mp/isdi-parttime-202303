const splice = (array, start, itemsAdd = false, ...items) => {
  let spliced = [];

  start = start < 0 ? array.length + start : start;

  for (i = 0; i < itemsAdd; i++) {
    spliced[i] = array[start + i];
  }

  for (let i = array.length - 1; i >= start; i--) {
    const element = array[i];

    array[i + items.length - itemsAdd] = element;
  }
  for (let i = 0; i < items.length; i++) {
    array[start + i] = items[i];
  }

  if (spliced.length) {
    return spliced;
  }
  return [];
};

// console.warn('MyFish2');
// const myFish2 = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
// const removed2 = splice(myFish2, 3, 1);

// console.log(myFish2);
// // myFish is ["angel", "clown", "drum", "sturgeon"]
// console.log(removed2);
// // removed is ["mandarin"]

// console.warn('MyFish5');
// const myFish5 = ['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon'];
// const removed5 = splice(myFish5, 2, 2);

// console.log(myFish5);
// // myFish is ["parrot", "anemone", "sturgeon"]
// console.log(removed5);
// // removed is ["blue", "trumpet"]

// console.warn('myFish6');
// const myFish6 = ['angel', 'clown', 'mandarin', 'sturgeon'];
// const removed6 = splice(myFish6, -2, 1);

// console.log(myFish6);
// // myFish is ["angel", "clown", "sturgeon"]
// console.log(removed6);
// // removed is ["mandarin"]

// const myFish7 = ['angel', 'clown', 'mandarin', 'sturgeon'];
// const removed7 = splice(myFish7, 2);

// console.log(myFish7);
// // myFish is ["angel", "clown"]
// console.log(removed7);
// // removed is ["mandarin", "sturgeon"]

// console.warn('arr');
// const arr = [1, , 3, 4, , 6];
// console.log(splice(arr, 1, 2)); // [empty, 3]
// console.log(arr); // [1, 4, empty, 6]
