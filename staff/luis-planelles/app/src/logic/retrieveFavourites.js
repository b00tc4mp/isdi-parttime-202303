import { loadPosts } from '../data.js';
import { findUserById } from './helpers/data-managers.js';
import { validateCallback, validateId } from './helpers/validators.js';

const retrieveFavourites = (userId, callback) => {
  validateId(userId, 'user id');
  validateCallback(callback);

  findUserById(userId, (foundUser) => {
    if (!foundUser) {
      callback(new Error(`user with id ${userId} not found`));

      return;
    }

    loadPosts((posts) => {
      const postsUserFavourites = posts.filter((post) =>
        foundUser.info.favourites.includes(post.id)
      );

      callback(null, postsUserFavourites);
    });
  });
};

export { retrieveFavourites };
