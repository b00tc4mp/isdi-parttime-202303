import posts from './data/posts/data.mjs';

export const getPostsSorted = () => {
  const sortedPosts = posts.sort((recent, past) => Number(past.date) - Number(recent.date),);
  return sortedPosts;
}