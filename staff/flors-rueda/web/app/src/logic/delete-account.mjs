import users from './users/data.mjs';
import { getUserIndex } from './users/data-managers.mjs';
import { validateUserPassword, validateRepeatPassword } from './users/validators.mjs';

export const deleteAccount = (id, password, repeatPassword) => {
  validateUserPassword(id, password);
  validateRepeatPassword(password, repeatPassword)
  const index = getUserIndex(id);
  users.splice(index, 1);
  console.log(users)
}

