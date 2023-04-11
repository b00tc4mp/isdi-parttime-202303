import {
  validateEmail,
  validateName,
  validatePassword,
} from './helpers/validators.js';

import DEFAULT_AVATAR_URL from './helpers/global-variables.js';

const registerUser = (name, email, password) => {
  const nameValid = validateName(name);
  const emailValid = validateEmail(email);
  const passwordValid = validatePassword(password);

  const foundUser = findUserByEmail(email);

  if (foundUser) throw new Error('user already exists');

  let id = 'user-1';

  const lastUser = users[users.length - 1];

  if (lastUser) id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1);

  const newUser = {
    id: id,
    email: emailValid,
    info: {
      name: nameValid,
      password: passwordValid,
      avatar: DEFAULT_AVATAR_URL,
    },
  };

  users.push(newUser);

  return newUser;
};

export default registerUser;
