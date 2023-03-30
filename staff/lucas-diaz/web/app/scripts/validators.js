function validateEmail(user) {
    if (!user.email.trim()) throw new Error("Email is empty")
    if ( typeof user.email !== "string") throw new Error("Email is not a string");
    if (user.email === " ") throw new Error("Email cant be a blankSpace")
}
function validateUsername(user){
    if (!user.name.trim()) throw new Error("Username is empty");
    if ( typeof user.name !== "string") throw new Error("Username is not a string");
    if (user.name === " ") throw new Error("Username cant be a blankSpace")
}

function validatePassword (user){
    if (!user.password) throw new Error("Password is empty")
    if ( typeof user.password !== "string") throw new Error("Password is not a string");
    if (user.password === " ") throw new Error("Password cant be a blankSpace")
    if(user.password.trim().length < 4) throw new Error("Password is shorter than 4 characters");
}
function validatePasswordsChanges(password, newPassword, newPasswordConfirm){
    if(!password.value.trim()) throw new Error("Password is empty")
    if(!newPassword.value.trim()) throw new Error("New password is empty")
    if(!newPasswordConfirm.value.trim()) throw new Error("New password confirmation is empty")
}

