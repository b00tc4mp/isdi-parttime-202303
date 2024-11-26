import { getPostUserName, getPostUserImage, getUserName } from "./data-managers.js"
import { context } from "../../ui.js"

export function returnUserImage(path, userId, showName) {

    const authorContainer = document.createElement('div')
    authorContainer.classList.add('post-author')
    path.append(authorContainer)
    authorContainer.setAttribute('title', getUserName(userId))
    
    const avatar = document.createElement('div')
    avatar.classList.add('avatar')
    authorContainer.append(avatar)
    
    const letter = document.createElement('div')
    letter.classList.add('letter')
    avatar.append(letter)
    
    const imageProfile = document.createElement('img')
    imageProfile.classList.add('image-profile')
    imageProfile.classList.add('hidden')
    avatar.append(imageProfile)
    const user = getPostUserName(userId)
    const userImage = getPostUserImage(userId)
    const separateUserName = user.split(' ')
    // path.querySelector('.user-name').innerText = user
    if (userImage) {
        imageProfile.src = userImage
        imageProfile.classList.remove('hidden')

    }

    if (!userImage && separateUserName.length === 1) {
        path.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[0][1]
    }
    if (!userImage && separateUserName.length > 1) {
        path.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[1][0]
    }

    if(showName) {
        const userName = document.createElement('div')
        userName.classList.add('user-name')
        authorContainer.append(userName)
        userName.innerText = getUserName(userId)
    }

    
}