import { loadPosts } from '../data.js';
import { findUserById } from './helpers/data-managers.js';
import { validateCallback, validateId } from './helpers/validators.js';

const retrievePostsUser = (userId, callback) => {
  validateId(userId, 'user id');
  validateCallback(callback);

  findUserById(userId, (foundUser) => {
    if (!foundUser) {
      callback(new Error(`user with id ${userId} not exist`));

      return;
    }

    loadPosts((posts) => {
      const postsUser = posts.filter((post) => post.author === foundUser.id);

      postsUser.forEach((post) => {
        post.author = {
          id: foundUser.id,
          name: foundUser.info.name,
          avatar: foundUser.info.avatar,
        };
      });

      callback(null, postsUser.toReversed());
    });
  });
};

export default retrievePostsUser;
