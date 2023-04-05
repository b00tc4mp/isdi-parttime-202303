//
const validateName = (name) => {
  const spacesBetween = /\s/g;

  if (!name.length) throw new Error('name is empty');
  if (typeof name !== 'string') throw new Error('name is not a string');
  if (spacesBetween.test(name)) throw new Error('name contains spaces between');

  return name.trim();
};

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email.length) throw new Error('email is empty');
  if (typeof email !== 'string') throw new Error('email is not an string');
  if (!emailRegex.test(email)) throw new Error('invalid email');

  return email;
};

const validatePassword = (password, type = 'password') => {
  const hasDigit = /\d/;
  const hasLowercase = /[a-z]/;
  const hasUppercase = /[A-Z]/;
  const hasSpecialChar = /[!@#$%^&*()_+~`=[\]{}|:;"'<,>.?/]/;
  const noWhitespace = /^\S+$/;
  const isLongEnough = password.length >= 8;

  if (!password.length) throw new Error(`${type} is empty`);
  if (typeof password !== 'string') throw new Error(`${type} is not a string`);
  if (!hasDigit.test(password))
    throw new Error(`${type} not contains one digit`);
  if (!hasLowercase.test(password))
    throw new Error(`${type} not contains one lowercase letter`);
  if (!hasUppercase.test(password))
    throw new Error(`${type} not contains one uppercase letter`);
  if (!hasSpecialChar.test(password))
    throw new Error(`${type} not contains one special character`);
  if (!noWhitespace.test(password))
    throw new Error(`${type}  contains any whitespace characters`);
  if (!isLongEnough)
    throw new Error(`${type} not be at least 8 characters long`);

  return password;
};

const updatePasswordValidation = (
  dataBasePassword,
  password,
  newPassword,
  newPasswordConfirm
) => {
  const passwordValid = validatePassword(password);
  const newPasswordValid = validatePassword(newPassword, 'new password');
  const newPasswordConfirmValid = validatePassword(
    newPasswordConfirm,
    'new password confirm'
  );

  if (passwordValid !== dataBasePassword)
    throw new Error("original password doesn't match");
  if (newPasswordValid !== newPasswordConfirmValid)
    throw new Error("new password doesn't match with password confirm");
  if (newPasswordValid === passwordValid)
    throw new Error('new password is equal to old');

  return newPasswordValid;
};

export {
  validateEmail,
  validateName,
  validatePassword,
  updatePasswordValidation,
};
