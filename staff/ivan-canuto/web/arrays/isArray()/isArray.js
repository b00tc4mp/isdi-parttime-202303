function isArray(variable) {
  return typeof variable === 'object' && variable !== null && typeof variable.length === 'number' && variable.length >= 0 && Number.isFinite(variable.length);
}