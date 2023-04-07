import {users} from './data.mjs'
import { menuHeader } from './pages/header.mjs'
import { userAccount } from './pages/user-account.mjs'
import {validateEmail, validatePassword, validateNewPassword} from './validators.mjs'
import { bodyPage, toggleOffClassInSection, deleteClassOnContainer, context } from './ui.mjs'
import { loginPage, loginPageMessage } from './pages/login-page.mjs'
import {findUserById, findUserByEmail} from './logic/helpers/data-managers.mjs'
export function registerUser(name, email, password) {
    validateEmail(email)
    validatePassword(password)
    var checkEmail = users.find(user => user.email === email)
    if(checkEmail) {
        throw new Error('Email already registered')
    }
    if(checkEmail !== email) {
        name = name.trim()
        users.push({
            id: 'user-' + parseInt(users.length + 1),
            // id: users[users.length].slice(5) + parseInt(users.length + 1),
            name: name,
            email: email,
            password: password
        })
        return true
    }
}

export function authenticateUser(email, password)  {
    var checkUserId = users.find(user => user.email === email)
    var checkPassword = users.find(user => user.password === password)
    
    if (!checkUserId) {
        throw new Error('User or password incorrect')
    }

    if (!checkPassword) {
        throw new Error('User or password incorrect')
    }
    return checkUserId.id
}



export function pushUserDataInForm(id) {
    var userID = users.map(user => user.id).indexOf(id) 
    if (users[userID].id === id) {
        userAccount.querySelector('form.user-info input[name="name"]').value = users[userID].name
        userAccount.querySelector('form.user-info input[name="email"]').value = users[userID].email
        userAccount.querySelector('form.user-password input.current-password').value = users[userID].password
        const currentUserId = id
    }
}

export function updateUserName(userId) {
    var user = findUserById(userId)
    var newName = userAccount.querySelector('form.user-info input[name="name"]').value
        user.name = newName
}
export function updateUserEmail(userId, newEmail) {
    var user = findUserById(userId)
    var newEmail = userAccount.querySelector('form.user-info input[name="email"]').value

    // var userSessionChecker = users.email.find(user => user.email === email)
    validateEmail(newEmail)
    const currentUserEmail = findUserById(userId)

        if (user.email !== currentUserEmail.email && user.email === newEmail){
            throw new Error('Email already registered')
        }
        console.log()
        if (user.email === currentUserEmail.email && user.email !== newEmail){
            user.email = newEmail
            userAccount.querySelector('form.user-info input[name="name"]').disabled = true
            userAccount.querySelector('form.user-info input[name="email"]').disabled = true
            userAccount.querySelector('.message').classList.add('success')
            userAccount.querySelector('p.message').innerHTML = 'User info updated!'
        }
 }

export function updateUserPassword(currentId) {
        // var userID = users.map(user => user.id).indexOf(currentId)
        const userId = context.userId
        const user = findUserById(userId)

    var currentPassword = userAccount.querySelector('form.user-password input.current-password')
    var newPassword = userAccount.querySelector('form.user-password input.new-password')
    var repeatPassword = userAccount.querySelector('form.user-password input.repeat-password')
    // console.log(currentId)
    console.log(userId)
    validateNewPassword(currentPassword.value, newPassword.value, repeatPassword.value, user)

    user.password = newPassword.value
    currentPassword.disabled = true
    newPassword.disabled = true
    repeatPassword.disabled = true
    toggleOffClassInSection(userAccount.querySelector('form.data.user-password .buttons'))
    userAccount.querySelector('p.message').classList.remove('error')
    userAccount.querySelector('p.message').classList.add('success')
    return userAccount.querySelector('p.message').innerHTML = 'Password changed!'
}

export function updateUserImage(user) {
    var avatar = userAccount.querySelector('.avatar img.image-profile')
    var imageInput = userAccount.querySelector('form.user-info input[name="file"]')
    context.imageProfile = avatar.src
    var avatar = userAccount.querySelector('.avatar img.image-profile').classList.remove('hidden')
    var avatarHeader = menuHeader.querySelector('.avatar img.image-profile').classList.remove('hidden')
    imageInput.value = ""
}

export function logOut() {
    const currentUserEmail = ''
    toggleOffClassInSection(userAccount)
    deleteClassOnContainer(loginPage, 'off')
    deleteClassOnContainer(bodyPage, 'logged-in')
}

