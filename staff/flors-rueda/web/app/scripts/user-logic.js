export const isMailRegistered = (mail) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].mail === mail) return true;
  };
  return false;
};

export const findUser = (username) => {
  const loginUser = users.filter((user) => {
    return user.username === username;
  });
  let user = {
    username: loginUser[0].username,
    name: loginUser[0].name,
    mail: loginUser[0].mail,
    avatar: loginUser[0].avatar,
  };
  return user;
}

export const isUsernameRegistered = (username) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) return true;
  };
  return false;
};

export const isPasswordCorrect = (username, password) => {
  const loginUser = users.filter((user) => {
    return user.username === username;
  });
  return loginUser[0].password === password;
};

export const areNewOldPasswordsEqual = (username, newPassword) => {
  const loginUser = users.filter((user) => {
    return user.username === username;
  });
  return loginUser[0].password === newPassword;
};

export const confirmPassword = (password, repeatPassword) => {
  return password === repeatPassword;
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

export const isPasswordSafe = (password) => {
  const regexRule = /^.[A-Z\a-z\d]{5,}$/
  return regexRule.test(password);
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