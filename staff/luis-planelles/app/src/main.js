import { homePage, renderUser } from './pages/home-page.js';
import loginPage from './pages/login-page.js';
import renderPost from './pages/posts-page.js';
import { context, show } from './ui.js';

if (context.userId === undefined) {
  show(loginPage);
} else {
  show(homePage);
  renderPost(context.userId);
  renderUser(context.userId);
}
