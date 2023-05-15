import { findUserById } from "../data/data-managers";
import posts from "../data/posts";
import { validateUserID } from "../data/validators-users";

/**

 */
export const retrieveFavoritePosts = (userId) => {
  validateUserID(userId);
  const userFavs = findUserById(userId).favs;
  const postsToSort = posts();
  const sortedPosts = postsToSort.sort((recent, past) => Number(new Date(past.date)) - Number(new Date(recent.date)));
  return sortedPosts.filter((post) => { return userFavs.includes(post.id)});
}