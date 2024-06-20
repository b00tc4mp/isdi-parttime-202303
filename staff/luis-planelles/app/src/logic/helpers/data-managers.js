import { loadPosts, loadUsers } from '../../data.js';

const findUserByEmail = (email, callback) => {
  loadUsers((users) => {
    const foundUser = users.find((user) => user.email === email);

    callback(foundUser);
  });
};

const findUserById = (userId, callback) => {
  loadUsers((users) => {
    const foundUser = users.find((user) => user.id === userId);

    callback(foundUser);
  });
};

const findPostById = (postId, callback) => {
  loadPosts((posts) => {
    const foundPost = posts.find((post) => post.id === postId);

    callback(foundPost);
  });
};

export { findUserByEmail, findUserById, findPostById };
