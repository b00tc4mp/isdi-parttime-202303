import { users } from '../../data.js';
import { posts } from '../../data.js';

const findUserByEmail = (email) => {
  return users.find((user) => user.email === email);
};

const findUserById = (userId) => {
  return users.find((user) => user.id === userId);
};

const getPostById = (postId) => {
  return posts.find((post) => post.id === postId);
};

export { findUserByEmail, findUserById, getPostById };
