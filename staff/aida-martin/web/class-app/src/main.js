// import "./pages/login-page.js";
// import { loginPage } from "./pages/login-page.js";
// import { homePage, renderUser, renderPosts } from "./pages/home-page.js";
// import { context, show } from "./ui.js";

// if (context.userId === undefined) show(loginPage);
// else {
//   if (renderUser()) {
//     if (renderPosts()) show(homePage);
//   } else show(loginPage);
// }

import App from "./app.js";
import { Component } from "./library/composito.js";

const app = new App();
const body = new Component(document.body);

body.add(app);
