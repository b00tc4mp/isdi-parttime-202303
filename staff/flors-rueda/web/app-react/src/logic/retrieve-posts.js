import posts from "../data/posts";
import { validateUserID } from "../data/validators-users";

/**
 * Retrieve's all the post data
 * 
 * @param {string} userId The user logged id
 * @param {string} postId The id of the post to edit
 * 
 * @returns a post object = { id: string, author: string, text: string, image: string, date: date, edited: array of dates, likes: array of strings}
 */
export const retrievePosts = (userId) => {
  validateUserID(userId);
  const postsToSort = posts();
  const sortedPosts = postsToSort.sort((recent, past) => Number(new Date(past.date)) - Number(new Date(recent.date)));
  return sortedPosts;
}