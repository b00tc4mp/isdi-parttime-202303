import { menuHeader } from "../pages/header.js";
import { getUserName } from "./helpers/data-managers.js";
import { userAccount } from "../pages/user-account.js";
import { context } from "../ui.js";

export function pushUserDataToHeader(userId) {

    const currentUser = getUserName(userId)
    const separateUserName = getUserName(userId).split(' ')

    menuHeader.querySelector('.user-name').innerText = currentUser
    if (context.image) {
        userAccount.querySelector('.avatar img.image-profile').src = context.image
        menuHeader.querySelector('.avatar img.image-profile').src = context.image
        userAccount.querySelector('.avatar img.image-profile').classList.remove('hidden')
        menuHeader.querySelector('.avatar img.image-profile').classList.remove('hidden')

    }

    if (!context.image && separateUserName.length === 1) {
        menuHeader.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[0][1]
        userAccount.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[0][1]
    }
    if (!context.image && separateUserName.length > 1) {
        menuHeader.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[1][0]
        userAccount.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[1][0]
    }


}
// const userProfile = menuHeader.querySelector('.user-account')
// const ulProfile = document.createElement('div')
// ulProfile.innerHTML = posts.reduce((accumulator, post) => {
//     return accumulator + `<ul>
       
//         <li class="title">hola</li>
       
//     </ul>
//     `
// }, '')