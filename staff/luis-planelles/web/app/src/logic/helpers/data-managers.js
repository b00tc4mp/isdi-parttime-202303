//
import { users } from '../../data.js';
import { posts } from '../../data.js';

const findUserByEmail = (email) => {
  let foundUser;

  for (let i = 0; i < users.length; i++) {
    let user = users[i];

    if (user.email === email) {
      foundUser = user;

      break;
    }
  }

  return foundUser;
};

const findUserById = (userId) => {
  let foundUser;

  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    if (user.id === userId) {
      foundUser = user;

      break;
    }
  }

  return foundUser;
};

const getPostById = (postId) => {
  let postUser;

  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === postId) {
      postUser = posts[i];

      break;
    }
  }

  return postUser;
};

export { findUserByEmail, findUserById, getPostById };
