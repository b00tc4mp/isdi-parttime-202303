export const isMailRegistered = (mail) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].mail === mail) return true;
  };
  return false;
};

export const findUser = (mail) => {
  const loginUser = users.filter((user) => {
    return user.mail === mail;
  });
  return loginUser[0];
}

export const isUsernameRegistered = (username) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === '@' + username) return true;
  };
  return false;
};

export const isPasswordCorrect = (mail, password) => {
  const loginUser = users.filter((user) => {
    return user.mail === mail;
  });
  return loginUser[0].password === password;
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
    avatar: 'https://www.slotcharter.net/wp-content/uploads/2020/02/no-avatar.png',
  };
  users.push(user);
  return user
};

const hasMinimumLength = (password) => {
  return password.length >= 6;
};

const includesLowerAndUpperCase = (password) => {
  return (password.toLowerCase() !== password && password.toUpperCase() !== password);
};

const includesNumber = (password) => {
  const includesNumber = /\d/;
  return includesNumber.test(password);
};

export const isPasswordSafe = (password) => {
  return (hasMinimumLength(password) && includesLowerAndUpperCase(password) && includesNumber(password));
};
