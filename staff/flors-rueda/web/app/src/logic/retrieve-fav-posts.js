import { posts, favorites } from './data/posts/data.js';

export const getFavPosts= (userId) => {
  const userFav = favorites.filter(post => ((post.usersId).includes(userId)));
  const favPosts = [];
  userFav.forEach(fav => {
    const favPost = posts.find(post => post.id === fav.postId);
    favPosts.push(favPost);
  });
  return favPosts;
};