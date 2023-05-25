console.log("load logic")

import {validateEmail, validateUsername,validateId, validatePassword, validatePasswordsChanges, validateUrl, } from "./validators.mjs"
import { users } from "./data.mjs";


export const registerUser = (userName,email,password) => {
    validateUsername(userName);
    validateEmail(email);
    validatePassword(password);
    const foundUser = users.find(user => user.email === email);
    if (foundUser)
        throw new Error("This profile already exist");

    const lastUser = users.at(-1);
    let id = "user-1";

    if (lastUser)
        id = "user-" + (parseInt(lastUser.id.slice(5)) + 1)

    users.push({
        id: "id",
        name: userName,
        email: email,
        password: password
    });
}

export const cleanChangePasswordForm = () => {
    document.querySelector(".old-password").value ="";
    document.querySelector(".new-password").value = "";
    document.querySelector(".new-password-repetition").value = "";
}

export const vanishWarningIn3Seconds = (advice, className) => {
    setTimeout(() => {
        advice.classList.add(className);
    },4000);
}

export const authenticateUser = (email,password) => {
    validateEmail(email);
    validatePassword(password);
    
    const foundUser = users.find(user => user.email === email);

    if (!foundUser || foundUser.password !== password) throw new Error("Email or password wrong")
    return foundUser.id;
}

export const addUserNameInHeader = (authenticatedUserId, welcomeMessage) => {
    const currentUser = users.find( user => user.id === authenticatedUserId);
    welcomeMessage.textContent = currentUser.name;
}

export const resetUserNameInHeader = (welcomeMessage) => { 
    welcomeMessage.textContent = "Welcome ";
}

export function updateUserPassword(authenticatedUserId, password, newPassword, newPasswordConfirm) {
    validatePasswordsChanges(password,newPassword, newPasswordConfirm);
    validateId( authenticatedUserId)


    const currentUser =  users.find(user => user.id === authenticatedUserId);
    const currentUserIndex = users.findIndex(user => user.id === authenticatedUserId);

    if (currentUser.password !== password.value) throw new Error("typed password isn't actual password user's value")
    if (password.value === newPassword.value) throw new Error("Password is equal than new password")
    if (newPassword.value !== newPasswordConfirm.value) throw new Error("New password and new password confirmation are not the same")

    users[currentUserIndex].password = newPassword.value;
}

export function setExistingAvatar(authenticatedUserId, defaultUrl, avatarImage){
    const currentUser = users.find( user => user.id === authenticatedUserId);
    if (currentUser.avatar){
        avatarImage.src = currentUser.avatar;
        return;
    }
    avatarImage.src = defaultUrl;
}

export const updateUserAvatar = (authenticatedUserId, url) => { 
    validateId(authenticatedUserId);
    validateUrl(url);
    const foundUser = users.find(user => user.id === authenticatedUserId);
    if (!foundUser) throw new Error("user not found");
    foundUser.avatar = url;
}

