import { loadPosts, loadUsers } from './data';


export const isMailRegistered = (mail, callback) =>
  loadUsers(users => {
    const isRegistered = users.some(user => user.mail === mail);
    callback(isRegistered);
  });

export const isIdRegistered = (id, callback) =>
  loadUsers(users => {
    const isRegistered = users.some(user => user.id === id);
    callback(isRegistered);
});

export const isUsernameRegistered = (username, callback) => 
  loadUsers(users => {
    const isRegistered = users.some(user => user.username === username);
    callback(isRegistered);
});

export const isPasswordCorrect = (id, password, callback) => 
  loadUsers(users => {
    const isCorrectPassword = () => {
      const loginUser = users.filter((user) => user.id === id);
      return loginUser[0].password === password;
    }
    callback(isCorrectPassword);
});

export const areNewOldPasswordsEqual = (id, newPassword, callback) => 
  loadUsers(users => {
    const isPasswordsEqual = () => {
      const loginUser = users.filter((user) => user.id === id);
      return loginUser[0].password === newPassword;
    }
    callback(isPasswordsEqual);
});

export const confirmPassword = (password, repeatPassword) => {
  return password === repeatPassword;
};

export const isPasswordSafe = (password) => {
  const regexRule = /^.[A-Z\a-z\d]{5,}$/
  return regexRule.test(password);
};

export const isPostPublished = (id, callback) => 
  loadPosts(posts => {
    const isPublished = posts.some(post => post.id === id);
    callback(isPublished);
  })



