//
const unshift = (array, ...args) => {
  let argumentsArray = [];

  for (let i = 0; i < array.length + args.length; i++) {
    argumentsArray[i] = args[i];
  }
  for (let i = 0; i < array.length; i++) {
    argumentsArray[args.length + i] = array[i];
  }
  for (let i = 0; i < argumentsArray.length; i++) {
    array[i] = argumentsArray[i];
  }

  return argumentsArray.length;
};
