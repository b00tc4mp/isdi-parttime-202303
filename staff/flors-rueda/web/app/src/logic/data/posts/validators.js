import { posts, favorites } from './data.js'

export const isPostFavByUser = (postId, userId) => {
  const postHasFav = favorites.filter((post) => post.postId === postId)[0];
  if(!postHasFav) return false
  else {
    return (postHasFav.usersId).includes(userId);
  }
}

export const validatFavByUser = (postId, userId) => {
  if(isPostFavByUser(postId, userId)) throw Error('user already fav that post');
};