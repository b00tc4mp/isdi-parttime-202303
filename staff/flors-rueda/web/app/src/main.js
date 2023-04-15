import { loginPage } from "./pages/login-page.js";
import { homePage } from "./pages/home-page.js";
import { context, setOff, setOn } from "./ui/general-tools.js";
import { renderAllPosts } from "./ui/posts.js";
import { toggle } from "./pages/home-edit-profile-page.js";
import { postModal } from "./pages/home-posts-modal-page.js";

const checkbox = document.querySelector(".mode-checkbox");

checkbox.addEventListener("change", (event) => {
  event.preventDefault();
  document.body.classList.toggle("dark-mode");
  context.theme = (document.body.classList).contains('dark-mode') ? 'dark' : 'light'
});

if (context.theme === 'dark') document.body.classList.add("dark-mode")
else document.body.classList.remove("dark-mode")

if (!context.userAuth) setOn(loginPage);
else {
  renderAllPosts(context.userAuth, postModal)
  setOn(homePage)
  setOff(toggle)
}

