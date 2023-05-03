import retrieveUser from '../../logic/retrieve-user.js';
import toggleLikePost from '../../logic/toggle-like-post.js';
import { context } from '../../ui.js';
import createLikeButton from '../button-like.js';

const updateLikesInfo = (likesCount, likesUsers, postLikes) => {
  const postLikesUsers = postLikes.likesUsers;

  likesCount.innerText = !postLikesUsers ? '' : postLikesUsers.length;
  likesUsers.innerText = !postLikesUsers ? '' : postLikesUsers.join(', ');
};

const handleLikeClick = (buttonLike, post, likesCount, likesUsers) => {
  try {
    const postLikes = toggleLikePost(post.id, context.userId),
      heartIcon = buttonLike.querySelector('.fa-heart');

    heartIcon.classList.toggle('fas');
    updateLikesInfo(likesCount, likesUsers, postLikes);
  } catch (error) {
    alert(error.message);
  }
};

const checkIsLiked = (post, userId) => {
  try {
    const retrievedUser = retrieveUser(userId);

    const isLiked =
      post.likesUsers && post.likesUsers.includes(retrievedUser.name);

    return isLiked;
  } catch (error) {
    alert(error.message);
  }
};

const renderLikesInfo = (likesCount, likesUsers) => {
  const likesInfo = document.createElement('div');

  likesInfo.classList.add('post-likes-info');
  likesInfo.append(likesCount, likesUsers);

  return likesInfo;
};

const renderLikeButton = (post, likesCount, likesUsers) => {
  const isLiked = checkIsLiked(post, context.userId),
    likeButton = createLikeButton(isLiked);

  likeButton.onclick = () =>
    handleLikeClick(likeButton, post, likesCount, likesUsers);

  return likeButton;
};

export { checkIsLiked, handleLikeClick, renderLikesInfo, renderLikeButton };
