import { posts, users } from '../../data.js';

const findUserByEmail = (email) => {
  const foundUser = users().find((user) => user.email === email);
  return foundUser;
};

const findUserById = (userId) => {
  const foundUser = users().find((user) => user.id === userId);
  return foundUser;
};

const findPostById = (postId) => {
  const foundPost = posts().find((post) => post.id === postId);
  return foundPost;
};

export { findUserByEmail, findUserById, findPostById };
