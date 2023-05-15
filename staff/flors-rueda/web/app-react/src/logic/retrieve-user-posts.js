import { findUserById } from "../data/data-managers";
import posts from "../data/posts";
import { validateUserID } from "../data/validators-users";

/**
TODO: add documentation to all logic functions
 */
export const retrieveUserPosts = (userId) => {
  validateUserID(userId);
  const postsToSort = posts();
  const sortedPosts = postsToSort.sort((recent, past) => Number(new Date(past.date)) - Number(new Date(recent.date)));
  return sortedPosts.filter((post) => { return post.author === userId});
}