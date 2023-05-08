import { isPostFavByUser } from './data/helpers.js';
import { posts, favorites } from './data/posts/data.js';
import { retrievePostInfo } from './retrieve-post.js';

export const getPostsSorted = (userAuth, postsToSort = posts) => {
  const sortedPosts = postsToSort.sort((recent, past) => Number(new Date(past.date)) - Number(new Date(recent.date)),);
  let allPosts = []
  sortedPosts.forEach(post => {
    post.date = new Date(post.date);
    const index = favorites.findIndex(favorite => favorite.postId === post.id);
    post.fav = index === -1 ? 0 : favorites[index].usersId.length;
    post.isFav = isPostFavByUser(post.id, userAuth);
    post.isLiked = posts[index].likes.indexOf(userAuth) >= 0 ? true : false;
    let postData = retrievePostInfo(post.id);
    allPosts.push(postData);
  });
  return allPosts;
}