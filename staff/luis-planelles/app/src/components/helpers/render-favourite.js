import retrieveUser from '../../logic/retrieve-user';
import toggleFavouritePost from '../../logic/toggle-favourite-post';

const createFavouritesButton = (isFavourite) => {
  const buttonFavourites = document.createElement('button'),
    favoriteIcon = document.createElement('i');

  favoriteIcon.classList.add('far', 'fa-bookmark');
  buttonFavourites.classList.add('button-favourites');
  buttonFavourites.appendChild(favoriteIcon);

  if (isFavourite) favoriteIcon.classList.add('fas');

  return buttonFavourites;
};

const handleFavoriteClick = (postFavouriteButton, post, user) => {
  try {
    toggleFavouritePost(post.id, user);
    const favoriteIcon = postFavouriteButton.querySelector('.fa-bookmark');

    favoriteIcon.classList.toggle('fas');
  } catch (error) {
    alert(error.message);
  }
};

const checkFavoritePost = (post, userId) => {
  try {
    const retrievedUser = retrieveUser(userId);
    const isFavourite =
      retrievedUser.favourites && retrievedUser.favourites.includes(post.id);

    return isFavourite;
  } catch (error) {
    alert(error.message);
  }
};

const renderPostFavourite = (post, user) => {
  const postFavouriteButton = document.createElement('div');
  postFavouriteButton.classList.add('post-favourite-button');

  const isFavourite = checkFavoritePost(post, user),
    buttonFavourites = createFavouritesButton(isFavourite);

  buttonFavourites.onclick = () => {
    handleFavoriteClick(postFavouriteButton, post, user);
  };

  postFavouriteButton.appendChild(buttonFavourites);

  return postFavouriteButton;
};

export default renderPostFavourite;
