
const concat = (...args) => {
  let arrayResult = [];

  for (let arg of args) {
    if (arg.length) {
      for (let item of arg) {
        arrayResult[arrayResult.length] = item;
      }
    } else {
      arrayResult[arrayResult.length] == arg;
    }
  }
  return arrayResult;
};
