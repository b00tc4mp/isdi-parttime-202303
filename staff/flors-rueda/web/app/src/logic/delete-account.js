import users from './data/users/data.js';
import { getUserIndex, saveUsers } from './data/users/data-managers.js';
import { validateUserPassword, validateRepeatPassword, validateUserID } from './data/users/validators.js';
import { saveFavorites, savePosts } from './data/posts/data-managers.js';
import { favorites, posts } from './data/posts/data.js';

export const deleteAccount = (id, password, repeatPassword) => {
  validateUserID(id);
  validateUserPassword(id, password);
  validateRepeatPassword(password, repeatPassword);

  let userPostsId = [];

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    if (post.author === id) {
      userPostsId.push(post.id);
      posts.splice(i, 1);
      i--;
    } else {
      post.likes = post.likes.filter((likeId) => likeId !== id);
    };
  };

  const favoritesCopy = favorites.map((favorite) => {
    if ((favorite.usersId).includes(id)) {
      favorite.usersId = favorite.usersId.filter((userId) => userId !== id);
      if (favorite.usersId.length === 0) {
        return null;
      }
    }
    if (userPostsId.includes(favorite.postId)) {
      return null;
    }
    return favorite;
  }).filter((favorite) => favorite !== null);


  const index = getUserIndex(id);
  users.splice(index, 1);

  saveUsers();
  savePosts();
  saveFavorites(favoritesCopy);
};