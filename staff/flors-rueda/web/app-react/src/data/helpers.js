import posts from './posts.js';
import users from './users.js';

export const generateUUID = () => {
  let date = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, character => {
    let random = Math.random() * 16;
    random = (date + random) % 16 | 0;
    date = Math.floor(date / 16);
    return (character === 'x' ? random : (date)).toString(16);
  });
};

export const isMailRegistered = (mail) => {
  const _users = users();
  for (let i = 0; i < _users.length; i++) {
    if (_users[i].mail === mail) return true;
  };
  return false;
};

export const isIdRegistered = (id) => {
  const _users = users();
  for (let i = 0; i < _users.length; i++) {
    if (_users[i].id === id) return true;
  };
  return false;
}

export const isUsernameRegistered = (username) => {
  const _users = users();
  for (let i = 0; i < _users.length; i++) {
    if (_users[i].username === username) return true;
  };
  return false;
};

export const isPasswordCorrect = (id, password) => {
  const _users = users();
  const loginUser = _users.filter((user) => user.id === id);
  return loginUser[0].password === password;
};

export const areNewOldPasswordsEqual = (id, newPassword) => {
  const _users = users();
  const loginUser = _users.filter((user) => user.id === id);
  return loginUser[0].password === newPassword;
};

export const confirmPassword = (password, repeatPassword) => {
  return password === repeatPassword;
};

export const isPasswordSafe = (password) => {
  const regexRule = /^.[A-Z\a-z\d]{5,}$/
  return regexRule.test(password);
};

export const isPostPublished = (id) => {
  const _posts = posts();
  for (let i = 0; i < _posts.length; i++) {
    if (_posts[i].id === id) return true;
  };
  return false
};

