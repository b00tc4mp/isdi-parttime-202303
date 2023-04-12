import users from './data/users/data.js';
import { getUserIndex } from './data/users/data-managers.js';
import { validateUserPassword, validateRepeatPassword } from './data/users/validators.js';


// TODO: check how to delete posts
export const deleteAccount = (id, password, repeatPassword) => {
  validateUserPassword(id, password);
  validateRepeatPassword(password, repeatPassword)
  const index = getUserIndex(id);
  users.splice(index, 1);
}

