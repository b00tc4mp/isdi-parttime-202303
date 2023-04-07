import {users} from './data.mjs'
import {registerPage, loginPage, homePage, bodyPage, menuHeader, userAccount, registerPageMessage, loginPageMessage, userPageMessage, currentUserEmail} from './main.mjs'
console.log(users)
import {validateEmail, validatePassword, validateNewPassword} from './validators.mjs'
import { toggleOffClassInSection, deleteClassOnContainer } from './ui.mjs'
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

export function authenticateUser(id, password)  {
    var checUserId = users.find(user => user.id === id)
    var checkPassword = users.find(user => user.password === password)
    
    if (!checUserId) {
        throw new Error('User or password incorrect')
    }

    if (!checkPassword) {
        throw new Error('User or password incorrect')
    }
}

export function getUserName(id) {

    const userID = users.map(user => user.id).indexOf(id) 

    if (userID === -1) {
        throw new Error('User or password incorrect')
    }

    if (users[userID].id === id) {
        return users[userID].name
    }
}
export function getCurrentUser(email) {
    var userID = users.map(user => user.email).indexOf(currentUserEmail) 
    if (userID !== -1) {
        return email
    }
}

export function pushUserDataInForm(email) {
    var userID = users.map(user => user.email).indexOf(email) 
    if (users[userID].email === email) {
        userAccount.querySelector('form.user-info input[name="name"]').value = users[userID].name
        userAccount.querySelector('form.user-info input[name="email"]').value = users[userID].email
        userAccount.querySelector('form.user-password input.current-password').value = users[userID].password
        const currentUserEmail = email
    }
}

export function updateUserName(user) {
    var newName = userAccount.querySelector('form.user-info input[name="name"]').value
        user.name = newName
}
export function updateUserEmail(currentEmail, newEmail) {
    var newEmail = userAccount.querySelector('form.user-info input[name="email"]').value
    var userID = users.map(user => user.email).indexOf(currentEmail)

    // var userSessionChecker = users.email.find(user => user.email === email)
    validateEmail(newEmail)
        if (users[userID].email !== currentEmail && users[userID].email === newEmail){
            throw new Error('Email already registered')
        }
        console.log()
        if (users[userID].email === currentEmail && users[userID].email !== newEmail){
            users[userID].email = newEmail
            userAccount.querySelector('form.user-info input[name="name"]').disabled = true
            userAccount.querySelector('form.user-info input[name="email"]').disabled = true
            userAccount.querySelector('.message').classList.add('success')
            userAccount.querySelector('p.message').innerHTML = 'User info updated!'
        }
 }

export function updateUserPassword(email) {
    var userID = users.map(user => user.email).indexOf(email) 
    var currentPassword = userAccount.querySelector('form.user-password input.current-password')
    var newPassword = userAccount.querySelector('form.user-password input.new-password')
    var repeatPassword = userAccount.querySelector('form.user-password input.repeat-password')

    validateNewPassword(currentPassword.value, newPassword.value, repeatPassword.value, users[userID])

    users[userID].password = newPassword.value
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
    user.imageProfile = avatar.src
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

