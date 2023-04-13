import posts from './data/posts/data.js';

export const getPostsSorted = () => {
  const sortedPosts = posts.sort((recent, past) => Number(new Date(past.date)) - Number(new Date(recent.date)),);
  return sortedPosts;
}