import {validateEmail, validatePassword } from "./helpers/validators.js"
import { findUserByEmail } from "./helpers/data-managers.js";

export default function authenticateUser (email,password) {
    validateEmail(email);
    validatePassword(password);
    
    const foundUser = findUserByEmail(email);

    if (!foundUser || foundUser.password !== password) throw new Error("Email or password wrong")
    return foundUser.id;
}