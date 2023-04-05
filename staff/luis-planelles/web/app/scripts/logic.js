//
import users from './data.js';
import {
  validateEmail,
  validateName,
  validatePassword,
  updatePasswordValidation,
} from './validators.js';

const registerUser = (name, email, password) => {
  const nameValid = validateName(name);
  const emailValid = validateEmail(email);
  const passwordValid = validatePassword(password);

  const foundUser = findUserByEmail(email);

  if (foundUser) throw new Error('user already exists');

  const newUser = {
    email: emailValid,
    info: {
      name: nameValid,
      password: passwordValid,
    },
  };

  users.push(newUser);

  return newUser;
};

const authenticateUser = (email, password) => {
  const foundUser = findUserByEmail(email);

  if (!foundUser || foundUser.info.password !== password)
    throw new Error('authentication failed');

  return foundUser;
};

const updateUserPassword = (
  email,
  password,
  newPassword,
  newPasswordConfirm
) => {
  const foundUser = findUserByEmail(email);
  if (!foundUser) throw new Error("user doesn't exists");

  const newPasswordValid = updatePasswordValidation(
    foundUser.info.password,
    password,
    newPassword,
    newPasswordConfirm
  );
  foundUser.info.password = newPasswordValid;
  alert('your password has been updated');
};

//helper

const findUserByEmail = (email) => {
  let foundUser;

  for (let i = 0; i < users.length; i++) {
    let user = users[i];

    if (user.email === email) {
      foundUser = user;

      break;
    }
  }

  return foundUser;
};

export { registerUser, authenticateUser, updateUserPassword };
