import {validateEmail, validatePassword } from "./helpers/validators.js"
import { users } from "../data.js";

export default function authenticateUser (email,password) {
    validateEmail(email);
    validatePassword(password);
    
    const foundUser = users.find(user => user.email === email);

    if (!foundUser || foundUser.password !== password) throw new Error("Email or password wrong")
    return foundUser.id;
}