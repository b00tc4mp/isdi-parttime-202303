import users from './users/data.mjs';

import { validateMail, validateNewPassword, validateNewUsername } from './users/validators.mjs';

//TODO: investigate uuid

const setNewId = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lastId = users[users.length - 1].id;
  const idParts = lastId.split('-');
  const letter = alphabet.indexOf(idParts[0]);
  let newId = '';
  if (idParts[1] < 999) newId = `${idParts[0]}-${(parseInt(idParts[1]) + 1).toString().padStart(3, '0')}`;
  else newId = `${alphabet[letter + 1]}-000`
  return newId
}
  
export const addNewUser = (mail, username, password, repeatPassword) => {
  validateMail(mail);
  validateNewUsername(username);
  validateNewPassword(password, repeatPassword);
  let user = {
    id: setNewId(),
    username: username,
    name: username.replace('@', ''),
    mail: mail,
    password: password,
  };
  users.push(user);
  console.log(users)
  return user
};