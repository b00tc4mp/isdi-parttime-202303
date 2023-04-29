//
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

export default createLikeButton;
