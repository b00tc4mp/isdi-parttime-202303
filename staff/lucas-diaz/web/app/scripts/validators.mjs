console.log("load validators")
export function validateEmail(user) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!user.email.trim()) throw new Error("Email is empty")
    if ( typeof user.email !== "string") throw new Error("Email is not a string");
    if (user.email === " ") throw new Error("Email cant be a blankSpace")
    if (!emailRegex.test(user.email)) throw new Error('Invalid email format')
}
export function validateEmailOnly(email){
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!email.trim()) throw new Error("Email is empty")
    if ( typeof email !== "string") throw new Error("Email is not a string");
    if (email === " ") throw new Error("Email cant be a blankSpace")
    if (!emailRegex.test(email)) throw new Error('Invalid email format')
}
export function validateUsername(user){
    if (!user.name.trim()) throw new Error("Username is empty");
    if ( typeof user.name !== "string") throw new Error("Username is not a string");
    if (user.name === " ") throw new Error("Username cant be a blankSpace")
}

export function validatePassword (user){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    if (!user.password) throw new Error("Password is empty")
    if ( typeof user.password !== "string") throw new Error("Password is not a string");
    if (user.password === " ") throw new Error("Password cant be a blankSpace")
    if(user.password.trim().length < 4) throw new Error("Password is shorter than 4 characters");
    if (!passwordRegex.test(user.password)) throw new Error(`password format incorrect`)
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

