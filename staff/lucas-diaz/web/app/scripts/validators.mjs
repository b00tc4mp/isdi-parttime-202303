console.log("load validators")
export function validateEmail(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!email.trim()) throw new Error("Email is empty")
    if ( typeof email !== "string") throw new Error("Email is not a string");
    if (email === " ") throw new Error("Email cant be a blankSpace")
    if (!emailRegex.test(email)) throw new Error('Invalid email format')
}

export function validateUsername(userName){
    if (!userName.trim()) throw new Error("Username is empty");
    if ( typeof userName !== "string") throw new Error("Username is not a string");
    if (userName === " ") throw new Error("Username cant be a blankSpace")
}

export function validatePassword (password){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    if (!password) throw new Error("Password is empty")
    if ( typeof password !== "string") throw new Error("Password is not a string");
    if (password === " ") throw new Error("Password cant be a blankSpace")
    if(password.trim().length < 4) throw new Error("Password is shorter than 4 characters");
    if (!passwordRegex.test(password)) throw new Error(`password format incorrect`)
}
export function validatePasswordsChanges(password, newPassword, newPasswordConfirm){
    if(!password.value.trim()) throw new Error("Password is empty")
    if(!newPassword.value.trim()) throw new Error("New password is empty")
    if(!newPasswordConfirm.value.trim()) throw new Error("New password confirmation is empty")
}  

export function validateUrl(url){
    const avatarRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i
    if (!url.trim()) throw new Error("url is empty");
    if ( typeof url !== "string") throw new Error("url is not a string");
    if (url === " ") throw new Error("url cant be a blankSpace");
    if (!avatarRegex.test(url)) throw new Error('Image format invalid');
}

