import posts from "../data/posts";
import { validateUserID } from "../data/validators-users";

export const retrievePosts = (userId, postsToSort = posts()) => {
  validateUserID(userId);
  const sortedPosts = postsToSort.sort((recent, past) => Number(new Date(past.date)) - Number(new Date(recent.date)));
  return sortedPosts;
}