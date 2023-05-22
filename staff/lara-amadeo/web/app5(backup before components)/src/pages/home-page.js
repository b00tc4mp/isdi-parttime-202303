import { show, hide, context } from "../ui.js"
import { retrieveUser } from "../logic/helpers/data-managers.js"
import { showPostsInProfile } from "../logic/showPostsinProfile.js"
import { createPostModal } from "../components/new-post-panel.js"
import { initSettingsSection } from "../components/settings-section.js"

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

export function renderUser() {
    const user = retrieveUser(context.userId)

    sidebarProfileRow.querySelector('.sidebar-profile-username').innerHTML = user.username
    sidebarProfileRow.querySelector('.sidebar-profile-email').innerHTML = user.email
    sidebarProfileRow.querySelector('.sidebar-avatar').src = user.avatar
    topbarContainer.querySelector('.topbar-avatar').src = user.avatar
}

//-----------[internal]---------------
// [INTERNAL] delete likedPosts
// homePage.querySelector('.delete').onclick = () => {
//     // const _users = users()
//     // _users.forEach(_user => _user.likedPosts = [])
//     // saveUsersInStorage(_users)

//     // const _posts = posts()
//     // for(let i = _posts.length - 1; i > -1; i--)
//     // _posts.length--
//     // savePostsInStorage(_posts)

//     // const _users = users()

//     // _users.forEach(user => delete user.likedPosts)
//     // saveUsersInStorage(_users)

//     // const _posts = posts()
//     // const post = _posts.find(post => post.id === 'post-1')

//     // delete post.likes

//     // savePostInStorage(post)
// }

