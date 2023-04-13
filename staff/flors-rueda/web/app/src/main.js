import { loginPage } from "./pages/login-page.js";
import { homePage } from "./pages/home-page.js";
import { context, setOn } from "./ui/general-tools.js";
import { renderAllPosts } from "./ui/posts.js";

const checkbox = document.querySelector(".mode-checkbox");

checkbox.addEventListener("change", (event) => {
  event.preventDefault();
  document.body.classList.toggle("dark-mode");
});

if (!context.userAuth) setOn(loginPage);
else {
  renderAllPosts()
  setOn(homePage)
}
