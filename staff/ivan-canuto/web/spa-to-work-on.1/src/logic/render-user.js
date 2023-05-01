import { retrieveUser } from "./retrieve-user.js"
import { context } from "../ui.js";
import { avatarImage } from '../pages/home-page.js'
import { homePage } from "../pages/home-page.js";

export const renderUser = ()=>{
  try {
    const user = retrieveUser(context.userId);
    
    homePage.querySelector('a').textContent = user.name;
    avatarImage.src = user.avatar

    return true

  } catch (error) {
    
    alert(error.message)
    return false
  }
}