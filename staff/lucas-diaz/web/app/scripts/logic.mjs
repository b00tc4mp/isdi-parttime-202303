console.log("load logic")

import {validateEmail, validateUsername, validatePassword, validatePasswordsChanges, validateUrl, } from "./validators.mjs"
import { users } from "./data.mjs";

export const registerUser = (userName,email,password) => {
    validateUsername(userName);
    validateEmail(email);
    validatePassword(password);
    const foundUser = users.find(user => user.email === email);
    if (foundUser){
        throw new Error("This profile already exist");
    }
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
    validatePassword(password)
    
    const foundUser = users.find(user => user.email === email);

    if (!foundUser || foundUser.password !== password) throw new Error("Email or password wrong")
}
export const addUserNameInHeader = (authenticatedEmail, welcomeMessage) => {
    const currentUser = users.find( user => user.email === authenticatedEmail);
    welcomeMessage.textContent = currentUser.name;
}
export const resetUserNameInHeader = (welcomeMessage) => { 
    welcomeMessage.textContent = "Welcome ";
}
export function updateUserPassword(email, password, newPassword, newPasswordConfirm) {
    validatePasswordsChanges(password,newPassword, newPasswordConfirm);

    const currentUser =  users.find(user => user.email === email);
    const currentUserIndex = users.findIndex(user => user.email === email);

    if (currentUser.password !== password.value) throw new Error("typed password isn't actual password user's value")
    if (password.value === newPassword.value) throw new Error("Password is equal than new password")
    if (newPassword.value !== newPasswordConfirm.value) throw new Error("New password and new password confirmation are not the same")

    users[currentUserIndex].password = newPassword.value;
}
export const updateUserAvatar = (email, url) => { 
    validateEmailOnly(email);
    validateUrl(url);
    const foundUser = users.find(user => user.email === email);
    if (!foundUser) throw new Error("user not found");
    foundUser.avatar = url;
}

