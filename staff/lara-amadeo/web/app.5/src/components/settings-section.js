import { updateAvatar } from "../logic/updateAvatar.js"
import { showPosts } from "../logic/showPosts.js"
import { updatePassword } from "../logic/updatePassword.js"
import { updateEmail } from "../logic/updateEmail.js"
import { getImageFromLocal } from "../logic/getImageFromLocal.js"
import { findUserbyId, retrieveUser } from "../logic/helpers/data-managers.js"
import { hide, show, context, successToast } from "../ui.js"
import { renderUser } from "../logic/renderUser.js"

export function initSettingsSection(homePage){





//Logout link
settingsSectionMenu.querySelector('.logout-link').onclick = function (event) {
    event.preventDefault()

    delete context.userId
    hide(homePage, settingSection)
    show(loginPage)
}


return { profileSection, settingSection, settingsSectionMenu, updateEmailForm, updatePasswordForm, updateAvatarForm }
}