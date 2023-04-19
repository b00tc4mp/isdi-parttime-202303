import { context, show, hide, toggle } from '../ui.js';
import loginPage from './login-page.js';
import DEFAULT_AVATAR_URL from '../logic/helpers/global-variables.js';
import retrieveUser from '../logic/retrieve-user.js';
import initProfilePanel from '../components/profile-panel.js';
import initAddPostPanel from '../components/add-post-panel.js';
import getHomePage from '../components/get-home-page.js';

const homePage = getHomePage(),
  avatarImage = homePage.querySelector('.home-header-avatar'),
  addPostButton = homePage.querySelector('.add-post-button'),
  homeLinks = homePage.querySelectorAll('a'),
  profileLink = homeLinks[1],
  goHome = homeLinks[0],
  profilePanel = initProfilePanel(homePage, avatarImage),
  addPostPanel = initAddPostPanel(homePage);

homePage.querySelector('.home-header-logout').onclick = () => {
  delete context.userId;
  avatarImage.src = DEFAULT_AVATAR_URL;

  hide(homePage, profilePanel);
  show(loginPage);
};

goHome.onclick = (event) => {
  event.preventDefault();

  hide(profilePanel);
  show(homePage);
};

profileLink.onclick = (event) => {
  event.preventDefault();

  toggle(profilePanel);
};

addPostButton.onclick = () => {
  show(addPostPanel);
};

const renderUser = (userId) => {
  try {
    const user = retrieveUser(userId);

    profileLink.innerText = user.name;
    avatarImage.src = user.avatar ? user.avatar : DEFAULT_AVATAR_URL;

    return true;
  } catch (error) {
    alert(error.message);

    return false;
  }
};

export { avatarImage, profileLink, renderUser, homePage };
