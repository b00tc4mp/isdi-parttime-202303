import { loadPosts, loadUsers } from '../data.js';
import { findUserById } from './helpers/data-managers.js';
import { validateCallback, validateId } from './helpers/validators.js';

const retrievePosts = (userId, callback) => {
  validateId(userId, 'user id');
  validateCallback(callback);

  findUserById(userId, (foundUser) => {
    if (!foundUser) {
      callback(new Error(`user with id ${userId} not exist`));

      return;
    }

    loadPosts((posts) => {
      loadUsers((users) => {
        posts.forEach((post) => {
          post.favourite = foundUser.info.favourites.includes(post.id);

          const userAuthor = users.find((user) => user.id === post.author);

          post.author = {
            id: userAuthor.id,
            name: userAuthor.info.name,
            avatar: userAuthor.info.avatar,
          };
        });

        callback(null, posts.toReversed());
      });
    });
  });
};

export default retrievePosts;
