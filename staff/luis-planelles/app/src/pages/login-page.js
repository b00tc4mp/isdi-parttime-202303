import authenticateUser from '../logic/authenticate-user.js';
import { getHomePage, profileLink } from './home-page.js';
import registerPage from './register-page.js';
import retrieveUser from '../logic/retrieve-user.js';
import rederPosts from './posts-page.js';
import { context, show, hide } from '../ui.js';
import DEFAULT_AVATAR_URL from '../logic/helpers/global-variables.js';

const loginPage = document.querySelector('.login'),
  loginForm = loginPage.querySelector('form'),
  avatarImage = document.querySelector('.home-header-avatar');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const loginEmail = event.target.email.value,
    loginPassword = event.target.password.value;

  try {
    context.userId = authenticateUser(loginEmail, loginPassword);
    const user = retrieveUser(context.userId);

    profileLink.innerText = user.name;

    avatarImage.src = user.avatar ? user.avatar : DEFAULT_AVATAR_URL;

    loginForm.reset();

    hide(loginPage);
    show(getHomePage());
    rederPosts(context.userId);
  } catch (error) {
    alert(error.message);
  }
});

loginPage.querySelector('a').addEventListener('click', (event) => {
  event.preventDefault();

  hide(loginPage);
  show(registerPage);
});

export default loginPage;
