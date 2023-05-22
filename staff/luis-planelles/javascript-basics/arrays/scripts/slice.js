//
const slice = (array, sliceStart = 0, sliceEnd = false) => {
  let arrayResult = [],
    index = 0;

  sliceStart = sliceStart < 0 ? array.length + sliceStart : sliceStart;
  sliceEnd = sliceEnd < 0 ? array.length + sliceEnd : sliceEnd;

  for (let i = sliceStart; i < array.length; i++) {
    if (i !== sliceEnd) {
      arrayResult[index] = array[i];
      index++;
    }
  }
  const iterations = array.length - arrayResult.length;

  for (let i = 0; i < iterations; i++) {
    array[i] = arrayResult[i];
    array.length--;
  }
  return array;
};
