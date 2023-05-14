import users from './users.js'
import posts from './posts.js';

export const getId = (username) => {
  const _users = users();
  const loginUser = _users.filter((user) => user.username === username);
  return loginUser[0].id;
}

export const getMail = (id) => {
  const _users = users();
  const loginUser = _users.filter((user) => user.id === id);
  return loginUser[0].mail;
}

export const getUserIndex = (id) => {
  const _users = users();
  const loginUser = _users.filter((user) => user.id === id);
  return users.indexOf(loginUser[0]);
}

export function findPostById(postId) {
  const _posts = posts();
  return _posts.find(post => post.id === postId);
}

export const saveUsers = (users) => {
  localStorage.usersJson = JSON.stringify(users);
}

export const savePosts = (posts) => {
  localStorage.postsJson = JSON.stringify(posts);
}
export const saveUser = (user) => {
  const _users = users();
  const index = _users.findIndex(_user => _user.id === user.id);
  if (index < 0) _users.push(user);
  else _users.splice(index, 1, user);
  saveUsers(_users);
}

export const savePost = (post) => {
  const _posts = posts();
  const index = _posts.findIndex(_post => _post.id === post.id);
  if (index < 0) _posts.push(post);
  else _posts.splice(index, 1, post);
  savePosts(_posts);
}