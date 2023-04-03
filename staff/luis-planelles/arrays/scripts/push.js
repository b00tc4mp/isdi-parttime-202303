//
const push = (array, ...args) => {
  for (let i = 0; i < args.length; i++) {
    array[array.length] = args[i];
  }

  return array.length;
};
