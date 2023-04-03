//
const from = (iterable, functionAdded) => {
  let arrayResult = [];
  for (let i = 0; i < iterable.length; i++) {
    arrayResult[i] = functionAdded ? functionAdded(iterable[i]) : iterable[i];
  }
  return arrayResult;
};
