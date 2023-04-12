import users from './data.mjs'

export const getId = (username) => {
  const loginUser = users.filter((user) => user.username === username);
  return loginUser[0].id;
}

export const getMail = (id) => {
  const loginUser = users.filter((user) => user.id === id);
  return loginUser[0].mail;
}

export const getUserIndex = (id) => {
  const loginUser = users.filter((user) => user.id === id);
  return users.indexOf(loginUser[0]);
}