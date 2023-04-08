import users from './users/data.mjs'

export const retrieveUser = (id) => {
  const loginUser = users.filter((user) => user.id === id);
  let user = {
    username: loginUser[0].username,
    name: loginUser[0].name,
    mail: loginUser[0].mail,
    avatar: loginUser[0].avatar,
  };
  return user;
};