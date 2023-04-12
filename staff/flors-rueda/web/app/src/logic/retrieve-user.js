import users from './data/users/data.js'

export const retrieveUser = (id) => {
  const loginUser = users.filter((user) => user.id === id);
  let user = {
    username: loginUser[0].username,
    name: loginUser[0].name,
    avatar: loginUser[0].avatar,
    joined: loginUser[0].joined,
  };
  return user;
};