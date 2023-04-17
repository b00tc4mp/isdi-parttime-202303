import { saveFavorites, savePosts } from './data/posts/data-managers.js';
import { favorites } from './data/posts/data.js'
import { validatePostExists } from './data/posts/validators.js';


export const toggleFav = (postId, userId) => {
  validatePostExists(postId);
  const index = favorites.findIndex(favorite => favorite.postId === postId);
  if (index === -1) {
    favorites.push({ postId: postId, usersId: [userId] });
  } else {
    const userIndex = favorites[index].usersId.indexOf(userId);
    if (userIndex === -1) {
      favorites[index].usersId.push(userId);
    } else {
      favorites[index].usersId.splice(userIndex, 1);
    }
  };
  saveFavorites();
  savePosts();
  return index === -1 ? 1 : (favorites[index].usersId).length
}