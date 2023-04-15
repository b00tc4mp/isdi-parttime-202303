import { posts, favorites } from './data/posts/data.js';

export const getPostsSorted = () => {
  const sortedPosts = posts.sort((recent, past) => Number(new Date(past.date)) - Number(new Date(recent.date)),);
  sortedPosts.forEach(post => {
    post.date = new Date(post.date);
    const index = favorites.findIndex(favorite => favorite.postId === post.id);
    post.fav = index === -1 ? 0 : favorites[index].usersId.length
  });
  return sortedPosts;
}