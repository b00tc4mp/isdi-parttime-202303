import { saveFavorites, savePosts } from './data/posts/data-managers.js';
import { favorites } from './data/posts/data.js'


export const toggleFav = (postId, userId) => {
    const index = favorites.findIndex(favorite => favorite.postId === postId);
    let effect = 0
    if (index === -1) {
      favorites.push({ postId, usersId: [userId] });
      effect += 1
    } else {
      const userIndex = favorites[index].usersId.indexOf(userId);
      if (userIndex === -1) {
        favorites[index].usersId.push(userId);
        effect += 1
      } else {
        favorites[index].usersId.splice(userIndex, 1);
        effect -= 1
      }
    }

    saveFavorites();
    savePosts();
    return effect
}