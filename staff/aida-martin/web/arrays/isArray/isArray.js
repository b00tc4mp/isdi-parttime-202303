function isArray(element) {
  if (element === null) return false;

  if (typeof element !== "object") return false;

  return `${element}` !== "[object Object]";
}
