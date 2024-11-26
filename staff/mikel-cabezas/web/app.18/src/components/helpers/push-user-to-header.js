// import { menuHeader } from "../../template-parts/header.js";
import { getUserName } from "../../logic/helpers/dataManagers.js";
// import { userAccount } from "../../pages/user-account.js";
import { context } from "../../ui.js";

export function pushUserDataToHeader(userId) {
    document.body.classList.add('logged-in')
    const currentUser = getUserName(userId)
    const separateUserName = currentUser.split(' ')
    const menuHeader = document.querySelector('header .menu')
    menuHeader.querySelector('.user-name').innerText = currentUser
    if (context.image && context.image !== 'undefined') {
        // userAccount.querySelector('.avatar img.image-profile').src = context.image
        menuHeader.querySelector('.avatar img.image-profile').src = context.image
        // userAccount.querySelector('.avatar img.image-profile').classList.remove('hidden')
        menuHeader.querySelector('.avatar img.image-profile').classList.remove('hidden')

    }

    if (!context.image || context.image === 'undefined' && separateUserName.length === 1) {
        menuHeader.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[0][1]
        // userAccount.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[0][1]
    }
    if (!context.image || context.image === 'undefined' && separateUserName.length > 1) {
        menuHeader.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[1][0]
        // userAccount.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[1][0]
    }

}
