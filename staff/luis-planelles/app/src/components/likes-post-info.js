import toggleLikesPost from '../logic/toggle-like-posts.js';
import { context } from '../ui.js';

const createLikeButton = (isLiked) => {
  const buttonLike = document.createElement('button'),
    heartIcon = document.createElement('i');

  heartIcon.classList.add('far', 'fa-heart');
  buttonLike.classList.add('button-like');
  buttonLike.appendChild(heartIcon);

  if (isLiked) {
    heartIcon.classList.add('fas');
  }
  return buttonLike;
};

const updateLikesInfo = (likesUsers, likesCount, postLikes) => {
  likesCount.innerText = !postLikes.likesUsers
    ? ''
    : postLikes.likesUsers.length;

  likesUsers.innerText = !postLikes.likesUsers ? '' : postLikes.likesUsers;
};

const handleLikeClick = (buttonLike, post, likesUsers, likesCount) => {
  try {
    const postLikes = toggleLikesPost(post.id, context.userId),
      heartIcon = buttonLike.querySelector('.fa-heart');

    heartIcon.classList.toggle('fas');
    updateLikesInfo(likesUsers, likesCount, postLikes);
  } catch (error) {
    alert(error.message);
  }
};

const renderPostLikesInfo = (post, user) => {
  const postLikesInfo = document.createElement('div');
  postLikesInfo.classList.add('post-likes-info');

  const isLiked = post.likesUsers && post.likesUsers.includes(user.name),
    buttonLike = createLikeButton(isLiked);

  buttonLike.onclick = () =>
    handleLikeClick(buttonLike, post, likesUsers, likesCount);

  const likesUsers = document.createElement('p');
  likesUsers.classList.add('likes-users');
  likesUsers.innerText = !post.likesUsers ? '' : post.likesUsers;

  const likesCount = document.createElement('p');
  likesCount.classList.add('likes-count');
  likesCount.innerText = !post.likesUsers ? '' : post.likesUsers.length;

  postLikesInfo.append(buttonLike, likesCount, likesUsers);

  return postLikesInfo;
};

export default renderPostLikesInfo;
