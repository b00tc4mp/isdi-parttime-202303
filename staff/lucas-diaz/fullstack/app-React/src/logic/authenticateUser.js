import { findUserByEmail } from "../data.js";
import { validators } from 'com'
const {validateEmail, validatePassword} = validators 

export default function authenticateUser (email,password, callback) {
    validateEmail(email);
    validatePassword(password);
    
    findUserByEmail(email, user => {
        if (!user || user.password !== password){
            callback(new Error("Email or password wrong"))
            return
        }
        
        callback(null, user.id);
    });
}