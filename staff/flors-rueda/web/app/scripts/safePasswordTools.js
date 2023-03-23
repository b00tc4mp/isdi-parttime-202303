const hasMinimumLength = (password) => {
  return password.length >= 6;
};

const includesLowerAndUpperCase = (password) => {
  return (password.toLowerCase() !== password && password.toUpperCase() !== password);
};

const includesNumber = (password) => {
  const includesNumber = /\d/;
  return includesNumber.test(password);
};

export const isPasswordSafe = (password) => {
  return (hasMinimumLength(password) && includesLowerAndUpperCase(password) && includesNumber(password));
};
