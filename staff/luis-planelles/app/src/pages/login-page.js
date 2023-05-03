import DEFAULT_AVATAR_URL from '../logic/helpers/global-variables.js';
import { context } from '../ui.js';
import { profileLink } from './home-page.js';

const loginPage = document.querySelector('.login'),
  loginForm = loginPage.querySelector('form'),
  avatarImage = document.querySelector('.home-header-avatar');

try {
  const retrievedUser = retrieveUser(context.userId);

  profileLink.innerText = retrievedUser.name;

  avatarImage.src = retrievedUser.avatar
    ? retrievedUser.avatar
    : DEFAULT_AVATAR_URL;

  loginForm.reset();
} catch (error) {
  alert(error.message);
}

export default loginPage;
