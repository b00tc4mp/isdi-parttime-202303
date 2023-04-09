import posts from './data.mjs';

export const getPostsSorted = () => {
  const sortedPosts = posts.sort((recent, past) => Number(past.date) - Number(recent.date),);
  return sortedPosts;
}
