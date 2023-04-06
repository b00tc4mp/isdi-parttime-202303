import users from './data.mjs'

export const getId = (username) => {
  const loginUser = users.filter((user) => user.username === username);
  return loginUser[0].id;
}

export const findUser = (id) => {
  const loginUser = users.filter((user) => user.id === id);
  let user = {
    username: loginUser[0].username,
    name: loginUser[0].name,
    mail: loginUser[0].mail,
    avatar: loginUser[0].avatar,
  };
  console.log(users)
  return user;
}

//TODO: investigate uuid

const setNewId = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lastId = users[users.length-1].id;
  const idParts = lastId.split('-');
  const letter = alphabet.indexOf(idParts[0]);
  let newId  = '';
  if(idParts[1] < 999) newId = `${idParts[0]}-${(parseInt(idParts[1])+1).toString().padStart(3, '0')}`;
  else newId = `${alphabet[letter+1]}-000`
  return newId
}

export const addNewUser = (mail, username, password) => {
  let user = {
    id: setNewId(),
    username: '@' + username,
    name: username,
    mail: mail,
    password: password,
  };
  users.push(user);
  return user
};

export const updateUserName = (id, newName) => {
  users.filter((user) => {
    if(user.id === id) user.name = newName;
  });
};

export const updateUserMail = (id, newMail) => {
  users.filter((user) => {
    if(user.id === id) user.mail = newMail;
  });
};

export const updateUserAvatar = (id, newAvatar) => {
  users.filter((user) => {
    if(user.id === id) user.avatar = newAvatar
  });
};

export const updateUserPassword = (id, newPassword) => {
  users.filter((user) => {
    if(user.id === id) user.password = newPassword;
  });
};