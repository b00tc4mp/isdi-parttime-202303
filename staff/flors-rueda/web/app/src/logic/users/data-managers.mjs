import users from './data.mjs'

export const getId = (username) => {
  const loginUser = users.filter((user) => user.username === username);
  return loginUser[0].id;
}