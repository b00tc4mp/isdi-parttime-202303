import {validateEmail, validateUsername, validatePassword } from "./helpers/validators.mjs"
import { users } from "../data.mjs";


export default function registerUser (userName,email,password) {
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