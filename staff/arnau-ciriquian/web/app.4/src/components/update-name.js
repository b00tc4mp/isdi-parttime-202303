import { updateUsername } from "../logic/update-user-name.js"
import { showHideContainer, context } from "../ui.js"
import { homePageProfile } from "../pages/home-page.js"

export default function initUpdateName(homePage) {
    const homePageUsername = homePage.querySelector('.home__username')

    homePage.querySelector('.username__form').onsubmit = function(event) {
        event.preventDefault()
    
        const oldUsername = event.target.oldUsername.value
        const newUsername = event.target.newUsername.value
        const password = event.target.password.value
    
        try {
            updateUsername(context.userID, oldUsername, newUsername, password)
            alert('name updated')
            homePage.querySelector('.home__anchor--profile').innerText = newUsername
    
            showHideContainer(homePageProfile, homePageUsername)
            homePage.querySelector('.username__form').reset()
        } catch (error) {
            alert(error.message)
        }
    }

    return homePageUsername
}
