// Data:

const users = [];

users.push({ username: 'garrus', mail: 'garrus@csec.net', password: 'Cal1brat1ons', });
users.push({ username: 'liara', mail: 'liara@uoe.net', password: 'Pr0theans', });
users.push({ username: 'grunt', mail: 'grunt@krogan.net', password: 'T-Wr3x', });

// Tools:

export const isMailRegistered = (mail) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].mail === mail) return true;
  };
  return false;
};

export const isUsernameRegistered = (username) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) return true;
  };
  return false;
};

export const isPasswordCorrect = (mail, password) => {
  const loginUser = users.filter((user) => {
    return user.mail === mail;
  });
  return loginUser[0].password === password;
};

export const addNewUser = (mail, username, password) => {
  let user = {
    username: username,
    mail: mail,
    password: password,
  };
  users.push(user);
};