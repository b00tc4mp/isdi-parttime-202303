import initThemeToggle from './components/theme-toggle.js';
import { context, setOff, setOn } from './ui/general-tools.js';/*
import { loginPage } from './pages/login-page.js';
import { homePage, postModal } from './pages/home-page.js';

import { toggle } from './pages/home-user-profile-page.js';
import initPostsList from './components/posts-list.js';
*/

initThemeToggle(context)

/*
if (!context.userAuth) setOn(loginPage);
else {
  initPostsList(context.userAuth, postModal, 'all');
  setOn(homePage);
  setOff(toggle);
}
*/