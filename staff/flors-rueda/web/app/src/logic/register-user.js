import { generateUUID } from './data/helpers.js';
import { saveUsers } from './data/users/data-managers.js';
import users from './data/users/data.js';
import { validateMail, validateNewPassword, validateNewUsername } from './data/users/validators.js';

  
export const registerUser = (mail, userName, password, repeatPassword) => {
  const username = '@' + userName.toLowerCase();
  validateMail(mail);
  validateNewUsername(username);
  validateNewPassword(password, repeatPassword);
  let user = {
    id: generateUUID(),
    username: username,
    name: username.replace('@', ''),
    mail: mail,
    password: password,
    joined: new Date(Date.now())
  };
  users.push(user);
  saveUsers();
  return user
};