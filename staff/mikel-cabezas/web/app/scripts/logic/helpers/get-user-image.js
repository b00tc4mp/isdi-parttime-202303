import { getPostUserName, getPostUserImage } from "./data-managers.js"
import { context } from "../../ui.js"

export function returnUserImage(path, userId) {
    const user = getPostUserName(userId)
    const userImage = getPostUserImage(userId)
    const separateUserName = user.split(' ')
    path.querySelector('.user-name').innerText = user
    if (userImage) {
        path.querySelector('.avatar img.image-profile').src = userImage
        path.querySelector('.avatar img.image-profile').classList.remove('hidden')

    }

    if (!userImage && separateUserName.length === 1) {
        path.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[0][1]
    }
    if (!userImage && separateUserName.length > 1) {
        path.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[1][0]
    }
}