import { loadPosts, loadUsers, savePosts, saveUsers } from '../data';
import postBelongingUser from './helpers/postBelongingUser';
import { validateCallback, validateId } from './helpers/validators';

const deleteFavoritesUsers = (postId, callback) => {
  validateId(postId, 'post id');
  validateCallback(callback);

  loadUsers((users) => {
    for (const user of users) {
      if (user.info.favourites) {
        const favouritePostIndex = user.info.favourites.findIndex(
          (post) => post === postId
        );

        if (favouritePostIndex !== -1) {
          user.info.favourites.splice(favouritePostIndex, 1);
        }
      }
    }
    saveUsers(users, () => callback(null));
  });
};

const deletePost = (userId, postId, callback) => {
  validateId(userId, 'user id');
  validateId(postId, 'post id');
  validateCallback(callback);

  postBelongingUser(userId, postId, (error) => {
    if (error) {
      callback(error.message);
    }
    return;
  });

  loadPosts((posts) => {
    const postIndex = posts.findIndex((post) => post.id === postId);

    posts.splice(postIndex, 1);

    savePosts(posts, () => callback(null));
  });

  deleteFavoritesUsers(postId, () => callback(null));
};

export default deletePost;
