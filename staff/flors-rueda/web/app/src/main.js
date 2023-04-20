import { loginPage } from "./pages/login-page.js";
import { homePage, postModal } from "./pages/home-page.js";
import { context, setOff, setOn } from "./ui/general-tools.js";
import { toggle } from "./pages/home-user-profile-page.js";
import initPostsList from "./components/posts-list.js";


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
  initPostsList(context.userAuth, postModal, 'all');
  setOn(homePage);
  setOff(toggle);
}

