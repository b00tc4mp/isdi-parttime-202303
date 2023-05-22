//
const unshift = (array, ...args) => {
  const arrayShifted = [];

  for (let i = 0; i < args.length + array.length; i++) {
    if (i < args.length) {
      arrayShifted[i] = args[i];
    } else {
      arrayShifted[i] = array[i - args.length];
    }
  }
  for (let i = 0; i < arrayShifted.length; i++) {
    array[i] = arrayShifted[i];
  }

  return array.length;
};
