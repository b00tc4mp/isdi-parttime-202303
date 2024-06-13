function join(array, separator = ",") {
  let string = "";

  for (var i = 0; i < array.length; i++) {
    if (i == array.length - 1) {
      string += array[i];
    } else {
      string += array[i] + separator;
    }
  }

  return string;
}
