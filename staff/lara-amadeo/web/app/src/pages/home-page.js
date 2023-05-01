import { show, hide, context } from "../ui.js"
import { retrieveUser } from "../logic/helpers/data-managers.js"
import { showPostsInProfile } from "../logic/showPostsinProfile.js"
import { createPostModal } from "../components/new-post-panel.js"
import { initSettingsSection } from "../components/settings-section.js"
import { posts } from "../data.js"

export const homePage = document.querySelector('.homepage')
const sidebarActions = homePage.querySelector('.sidebar-actions')

const { profileSection, settingSection, settingsSectionMenu, updateEmailForm, updatePasswordForm, updateAvatarForm } = initSettingsSection(homePage)

export const feed = homePage.querySelector('.feed')
export const feedPost = feed.querySelector('.post')

export const sidebarProfileRow = homePage.querySelector('.sidebar-profile')

const topbarContainer = homePage.querySelector('.topbar-container')


//settings link(sidebar)
sidebarActions.querySelector('.sidebar-settings').onclick = function (event) {
    event.preventDefault()

    show(settingsSectionMenu, settingSection)
    hide(feed, profileSection)
    hide(updateEmailForm, updatePasswordForm, updateAvatarForm)
}

//new post(button)
homePage.querySelector('.create-post-button').onclick = () => {
    show(createPostModal)
}

//profile-link(sidebar)
homePage.querySelector('.sidebar-profile').onclick = () => {
    try {
        const user = retrieveUser(context.userId)
        profileSection.querySelector('.personal-profile-image').src = user.avatar
        profileSection.querySelector('.personal-profile-username').innerHTML = user.username
        hide(feed)
        showPostsInProfile()
        show(profileSection)

    } catch (error) {
        generateToast({
            message: error.message,
            type: errorToast, 
            length: '3000ms'
        })
    }
}

//home-link(sidebar)
homePage.querySelector('.sidebar-home').onclick = () => {
    hide(profileSection, settingSection)
    show(feed)
}



