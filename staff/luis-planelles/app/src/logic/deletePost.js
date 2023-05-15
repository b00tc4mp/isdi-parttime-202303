import { posts, savePosts, saveUsers, users } from '../data';
import { findPostById, findUserById } from './helpers/data-managers';
import { validateId } from './helpers/validators';

const deleteFavoritesUsers = (postId) => {
  const _users = users();

  for (const user of _users) {
    if (user.info.favourites) {
      const favouritePostIndex = user.info.favourites.findIndex(
        (post) => post === postId
      );

      if (favouritePostIndex !== -1) {
        user.info.favourites.splice(favouritePostIndex, 1);
      }

      if (!user.info.favourites.length) {
        delete user.info.favourites;
      }
    }
  }

  saveUsers(_users);
};

const deletePost = (userId, postId) => {
  validateId('user id', userId);
  validateId('post id', postId);

  const foundUser = findUserById(userId);
  if (!foundUser) throw new Error(`user with id ${userId} not found`);

  const foundPost = findPostById(postId);
  if (!foundPost) throw new Error(`post with id ${postId} not found`);

  if (foundUser.id !== foundPost.author)
    throw new Error(
      `post with id ${postId} not belong to user with id ${userId}`
    );

  const _posts = posts();

  const postIndex = _posts.findIndex((post) => post.id === postId);

  _posts.splice(postIndex, 1);

  savePosts(_posts);

  deleteFavoritesUsers(postId);
};

export default deletePost;
