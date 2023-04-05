import users from './data.mjs'

export const findUser = (username) => {
  const loginUser = users.filter((user) => user.username === username);
  let user = {
    username: loginUser[0].username,
    name: loginUser[0].name,
    mail: loginUser[0].mail,
    avatar: loginUser[0].avatar,
  };
  return user;
}

export const addNewUser = (mail, username, password) => {
  let user = {
    username: '@' + username,
    name: username,
    mail: mail,
    password: password,
  };
  users.push(user);
  return user
};

export const updateUserName = (user, newName) => {
  users.filter((eachUser) => {
    if(eachUser.username === user) eachUser.name = newName;
  });
};

export const updateUserMail = (user, newMail) => {
  users.filter((eachUser) => {
    if(eachUser.username === user) eachUser.mail = newMail;
  });
};

export const updateUserAvatar = (user, newAvatar) => {
  users.filter((eachUser) => {
    if(eachUser.username === user) eachUser.avatar = newAvatar
  });
};

export const updateUserPassword = (user, newPassword) => {
  users.filter((eachUser) => {
    if(eachUser.username === user) eachUser.password = newPassword;
  });
};