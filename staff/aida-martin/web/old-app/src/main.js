import "./pages/login-page.js";
import { loginPage } from "./pages/login-page.js";
import { homePage, renderUser, renderPosts } from "./pages/home-page.js";
import { context, show } from "./ui.js";

if (context.userId === undefined) show(loginPage);
else {
  if (renderUser()) {
    if (renderPosts()) show(homePage);
  } else show(loginPage);
}
