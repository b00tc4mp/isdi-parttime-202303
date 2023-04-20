import { findPostById, findUserById } from "./helpers/data-managers";

export function isLiked(likesIcon, url) {
  return likesIcon.src !== url;
}

export function likedPost(isLiked, userId, postId) {
  const user = findUserById(userId);
  const post = findPostById(postId);

  //if
}
