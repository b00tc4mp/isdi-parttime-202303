//
const isArray = (array) => {
  if (array && typeof array === "object" && array.length && !array.byteLength) {
    return true;
  }
  return false;
};
