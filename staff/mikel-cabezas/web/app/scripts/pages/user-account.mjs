import { toggleOffClassInSection, showHidePassword } from '../ui.mjs'
import { context, changeMessageOnContainer } from '../ui.mjs'
import { file, img, avatarHeader, printImage } from '../localImagesBase64.mjs'
import { uploadImage } from '../logic/update-user-image.mjs'
import { updateUserName } from '../logic/update-user-name.mjs'
import { updateUserEmail } from '../logic/update-user-email.mjs'
import { updateUserPassword } from '../logic/update-user-password.mjs'
import { getUserName, findUserByEmail, findUserById, getCurrentUser } from '../logic/helpers/data-managers.mjs'
import { users } from '../data.mjs'
import { logOut} from '../logic/logout.mjs'
import { homePage } from './home-page.mjs'
import { menuHeader } from './header.mjs'



export const userPageMessage = document.querySelector('.section.user-account').querySelector('.message')
export const userAccount = document.querySelector('.section.user-account')
userAccount.querySelector('.button--update-info__profile').onclick = function() {
    toggleOffClassInSection(userAccount.querySelector('.buttons'))
    userAccount.querySelector('form.user-info input[name="name"]').removeAttribute('disabled')
    userAccount.querySelector('form.user-info input[name="email"]').removeAttribute('disabled')
    userAccount.querySelector('form.user-info input[name="file"]').removeAttribute('disabled')
    userAccount.querySelector('.button--update-info__profile').disabled = true
    // currentUserID = userAccount.querySelector('form.user-info input[name="email"]').value
    return context.userId
}

userAccount.querySelector('.button--update-info__cancel-info').onclick = function(event) {
    event.preventDefault()
    userAccount.querySelector('form.user-info input[name="name"]').disabled = true
    userAccount.querySelector('form.user-info input[name="email"]').disabled = true
    userAccount.querySelector('form.user-info input[name="file"]').disabled = true
    userAccount.querySelector('.button--update-info__profile').removeAttribute('disabled')
    toggleOffClassInSection(userAccount.querySelector('.buttons'))
}

userAccount.querySelector('.button--update-info__save-info').onclick = function(event) {
    event.preventDefault()
    const email = userAccount.querySelector('form.user-info input[name="email"]').value
    const emailInput = userAccount.querySelector('form.user-info input[name="email"]')
    const userName = userAccount.querySelector('form.user-info input[name="name"]').value
    const userNameInput = userAccount.querySelector('form.user-info input[name="name"]')
    const imageInput = userAccount.querySelector('form.user-info input[name="file"]')
    // const userID = users.map(user => user.email).indexOf(currentUserID)
    // const userID = users.map(user => user.email).indexOf(email)
    const userId = context.userId
    const currentUserEmail = findUserById(userId)
    const currentUserName = getUserName(userId)

    // if (users[userID].email === currentUserID) {
        try {
            if(userName !== currentUserName) {
                updateUserName(userId)
            }
            if(email !== currentUserEmail) {
                updateUserEmail(userId, email)
            }
            userNameInput.disabled = true
            emailInput.disabled = true
            imageInput.disabled = true
            toggleOffClassInSection(userAccount.querySelector('.buttons'))
            userAccount.querySelector('.button--update-info__profile').disabled = true
            changeMessageOnContainer(userPageMessage, 'User updated!', 'success')
            if(file.length !== 0) {
                uploadImage(context.userId, userAccount.querySelector('.avatar img.image-profile'), userAccount.querySelector('form.user-info input[name="file"]'), 'users')
                const avatarHeader = menuHeader.querySelector('.avatar img.image-profile').classList.remove('hidden')
                const avatar = userAccount.querySelector('.avatar img.image-profile').classList.remove('hidden')
            }
        } catch (error) {
            userAccount.querySelector('.message').classList.remove('success')
            userAccount.querySelector('.message').classList.add('error')        
            userAccount.querySelector('.message').textContent = error.message     
        }
    // }

    userAccount.querySelector('.button--update-info__profile').removeAttribute('disabled')
}
userAccount.querySelector('.button--update-info__password').onclick = function(event) {
    event.preventDefault()
    toggleOffClassInSection(userAccount.querySelector('form.data.user-password .buttons'))
    userAccount.querySelector('.button--update-info__password').disabled = true
    userAccount.querySelector('form.user-password input.current-password').removeAttribute('disabled')
    userAccount.querySelector('form.user-password input.new-password').removeAttribute('disabled')
    userAccount.querySelector('form.user-password input.repeat-password').removeAttribute('disabled')
}

userAccount.querySelector('.button--update-info__save-password').onclick = function(event) {
    event.preventDefault()

    try {
        const userId = context.userId

        var email = userAccount.querySelector('form.user-info input[name="email"]').value
        userAccount.querySelector('.button--update-info__password').removeAttribute('disabled')
        updateUserPassword(userId) 

    } catch(error) {
        userAccount.querySelector('p.message').classList.add('error')
        userAccount.querySelector('p.message').textContent = error.message
    }
}


userAccount.querySelector('.button--update-info__cancel-password').onclick = function(event) {
    event.preventDefault()
    userAccount.querySelector('.user-password').classList.add('off')
    userAccount.querySelector('form.user-password input.current-password').disabled = true
    userAccount.querySelector('form.user-password input.new-password').disabled = true
    userAccount.querySelector('form.user-password input.repeat-password').disabled = true
    userAccount.querySelector('.button--update-info__password').removeAttribute('disabled')
}

userAccount.querySelector('.current-password > i').onclick = function() {
    showHidePassword(userAccount, '.current-password')
}

userAccount.querySelector('.new-password > i').onclick = function() {
    showHidePassword(userAccount, '.new-password')
}

userAccount.querySelector('.repeat-password > i').onclick = function() {
    showHidePassword(userAccount, '.repeat-password')
}

userAccount.querySelector('.delete-account p').onclick = function() {
    // var userID = users.map(user => user.currentUserId).indexOf(currentUserId)
    const userId = context.userId
    getCurrentUser(userId)
    const user = parseInt(getCurrentUser(userId).slice(5) - 1)
    users.splice(user, 1)
    logOut()
}
userAccount.querySelector('.go-back').onclick = function(event) {
    event.preventDefault()
    toggleOffClassInSection(userAccount)
    toggleOffClassInSection(homePage)
}