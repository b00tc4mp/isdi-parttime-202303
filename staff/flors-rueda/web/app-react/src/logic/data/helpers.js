import { posts, favorites} from './posts/data.js';
import users from './users/data.js';

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
  for (let i = 0; i < users.length; i++) {
    if (users[i].mail === mail) return true;
  };
  return false;
};

export const isIdRegistered = (id) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) return true;
  };
  return false;
}

export const isUsernameRegistered = (username) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) return true;
  };
  return false;
};

export const isPasswordCorrect = (id, password) => {
  const loginUser = users.filter((user) => user.id === id);
  return loginUser[0].password === password;
};

export const areNewOldPasswordsEqual = (id, newPassword) => {
  const loginUser = users.filter((user) => user.id === id);
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
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === id) return true;
  };
  return false
};

export const isPostFavByUser = (postId, userId) => {
  const postHasFav = favorites.filter((post) => post.postId === postId)[0];
  if(!postHasFav) return false
  else {
    return (postHasFav.usersId).includes(userId);
  }
};
