import { retrieveUser } from "./retrieve-user.js"
import { context } from "../ui.js"
import { headerTitle, profileImage } from "../pages/home-page.js"


export const renderUser = () => {
  try {

    let user = retrieveUser(context.userId)
      
    headerTitle.textContent = user.name
    profileImage.src = user.avatar
    
    return true

  } catch (error) {
    
    alert('Sorry, something went wrong.')
    console.log(error);
    return false
  }
}