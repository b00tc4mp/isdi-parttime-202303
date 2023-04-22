import { users, posts } from "../../data";

export const vanishWarningIn3Seconds = (advice, className) => {
    setTimeout(() => {
        advice.classList.add(className);
    },4000);
}

export const cleanChangePasswordForm = () => {
    document.querySelector(".old-password").value ="";
    document.querySelector(".new-password").value = "";
    document.querySelector(".new-password-repetition").value = "";
}

export function findUserById(userId){
    let foundUser = users.find(user => user.id === userId)
    return foundUser;
}

export function findUserByEmail(email){
    let foundUser = users.find(user => user.email === email)
    return foundUser;
}

export function findUserPostByUserId(userId){
    let foundPost = posts.find(post => post.author === userId)
    return foundPost;
}

export function findUserPostByPostId(postId){
    let foundPost = posts.find(post => post.id === postId)
    return foundPost;
}
