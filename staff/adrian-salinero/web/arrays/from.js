function from2(object, mapFunction) {
  mapFunction;

  array = [];

  for (var i = 0; i < object.length; i++) {
    array[i] = mapFunction(object[i]);
  }

  return array;
}
