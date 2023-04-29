//
const createLikesUsers = (post) => {
  const likesUsers = document.createElement('p');
  likesUsers.classList.add('likes-users');
  likesUsers.innerText = !post.likesUsers ? '' : post.likesUsers.join(', ');

  return likesUsers;
};

const createLikesCount = (post) => {
  const likesCount = document.createElement('p');
  likesCount.classList.add('likes-count');
  likesCount.innerText = !post.likesUsers ? '' : post.likesUsers.length;

  return likesCount;
};

export { createLikesCount, createLikesUsers };
