import {validateEmail, validateUsername, validatePassword } from "./helpers/validators.js"
import { findUserByEmail } from "./helpers/dataManagers.js";
import { users, saveUsers } from "../data.js";


export default function registerUser (userName,email,password) {
    validateUsername(userName);
    validateEmail(email);
    validatePassword(password);
    const foundUser = findUserByEmail(email);
    if (foundUser)
        throw new Error("This profile already exist");

    const _users = users()
    const lastUser = _users.at(-1);
    let id = "user-1";

    if (lastUser)
        id = "user-" + (parseInt(lastUser.id.slice(5)) + 1)

    _users.push({
        id,
        name: userName,
        email: email,
        password: password,
        avatar: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
        savedPosts: []
    });
    saveUsers(_users);
}