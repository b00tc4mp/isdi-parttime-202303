import { addOffClass, removeOffClass, context } from "../ui.js";
import initProfilePanel from "../components/profile-panel.js";
import initAddPostPanel from "../components/add-post-panel.js";
import { loginPage } from "./login-page.js";

export const homePage = document.querySelector('.home')
export const createdPosts = homePage.querySelector('.created-posts')
export const avatarImage = homePage.querySelector('.avatar-image')
const profilePanel = initProfilePanel(homePage, avatarImage)
const addPostPanel = initAddPostPanel(homePage)
const addPostButton = homePage.querySelector('.add-post-button')

addPostButton.onclick = function () {
  removeOffClass(addPostPanel)
}
  
homePage.querySelector('.name-avatar-profile').onclick = function (event) {
  removeOffClass(profilePanel)
}

homePage.querySelector('.logout-button').onclick = function () {
  addOffClass(homePage)
  removeOffClass(loginPage)
  delete context.userId
}
