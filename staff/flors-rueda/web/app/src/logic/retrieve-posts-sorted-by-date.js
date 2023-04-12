import posts from './data/posts/data.js';

export const getPostsSorted = () => {
  const sortedPosts = posts.sort((recent, past) => Number(past.date) - Number(recent.date),);
  return sortedPosts;
}