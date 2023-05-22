import { saveUsers, users } from '../data.js';
import { findUserByEmail } from './helpers/data-managers.js';
import DEFAULT_AVATAR_URL from './helpers/global-variables.js';
import {
  validateEmail,
  validateName,
  validatePassword,
} from './helpers/validators.js';

const registerUser = (name, email, password) => {
  const nameValid = validateName(name);
  const emailValid = validateEmail(email);
  const passwordValid = validatePassword(password);

  const nameInData = users().some((user) => user.info.name === name);

  if (nameInData) throw new Error('name already exists');

  const foundUser = findUserByEmail(email);

  if (foundUser) throw new Error('user already exists');

  let id = 'user-1';

  const _users = users();

  const lastUser = _users[_users.length - 1];

  if (lastUser) {
    id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1);
  }

  const newUser = {
    id: id,
    email: emailValid,
    info: {
      name: nameValid,
      password: passwordValid,
      avatar: DEFAULT_AVATAR_URL,
    },
  };

  _users.push(newUser);

  saveUsers(_users);

  return newUser;
};

export default registerUser;
