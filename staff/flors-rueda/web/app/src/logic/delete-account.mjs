import users from './data/users/data.mjs';
import { getUserIndex } from './data/users/data-managers.mjs';
import { validateUserPassword, validateRepeatPassword } from './data/users/validators.mjs';

export const deleteAccount = (id, password, repeatPassword) => {
  validateUserPassword(id, password);
  validateRepeatPassword(password, repeatPassword)
  const index = getUserIndex(id);
  users.splice(index, 1);
}

