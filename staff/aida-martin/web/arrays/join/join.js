function join(element, separator = ",") {
  let result = "";

  for (let i = 0; i < element.length - 1; i++) {
    result += `${element[i]}${separator}`;
  }

  return `${result}${element[element.length - 1]}`;
}
