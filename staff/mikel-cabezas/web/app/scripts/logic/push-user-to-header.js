import { menuHeader } from "../template-parts/header.js";
import { getUserName } from "./helpers/data-managers.js";
import { userAccount } from "../pages/user-account.js";
import { context } from "../ui.js";

export function pushUserDataToHeader(userId) {





    const currentUser = getUserName(userId)
    const separateUserName = currentUser.split(' ')

    menuHeader.querySelector('.user-name').innerText = currentUser
    if (context.image && context.image !== 'undefined') {
        userAccount.querySelector('.avatar img.image-profile').src = context.image
        menuHeader.querySelector('.avatar img.image-profile').src = context.image
        userAccount.querySelector('.avatar img.image-profile').classList.remove('hidden')
        menuHeader.querySelector('.avatar img.image-profile').classList.remove('hidden')

    }

    if (!context.image || context.image === 'undefined' && separateUserName.length === 1) {
        menuHeader.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[0][1]
        userAccount.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[0][1]
    }
    if (!context.image || context.image === 'undefined' && separateUserName.length > 1) {
        menuHeader.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[1][0]
        userAccount.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[1][0]
    }


}
