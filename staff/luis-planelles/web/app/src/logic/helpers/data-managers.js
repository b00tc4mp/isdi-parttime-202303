import { users } from '../../data.js';
import { posts } from '../../data.js';

const findUserByEmail = (email) => {
  let foundUser;

  users.forEach((user) => {
    if (user.email === email) {
      foundUser = user;
    }
  });

  return foundUser;
};

const findUserById = (userId) => {
  let foundUser;

  users.forEach((user) => {
    if (user.id === userId) {
      foundUser = user;
    }
  });

  return foundUser;
};

const getPostById = (postId) => {
  let postUser;

  posts.forEach((post) => {
    if (post.id === postId) {
      postUser = post;
    }
  });

  return postUser;
};

export { findUserByEmail, findUserById, getPostById };
