//? LOGIC

const registerUser = (temporalUser) => {
    validateUsername(temporalUser);
    validateEmail(temporalUser);
    validatePassword(temporalUser);
    var foundUser = users.find(user => user.email === temporalUser.email);
    if (foundUser){
        throw new Error("This name already exist");
    }
    users.push(temporalUser);
}
//! CLEAN THINGS FUNCTIONS --> they can be tools i guess 

const cleanChangePasswordForm = () => {
    document.querySelector(".old-password").value ="";
    document.querySelector(".new-password").value = "";
    document.querySelector(".new-password-repetition").value = "";
}
const vanishWarningIn3Seconds = (advice, className) => {
    setTimeout(() => {
        advice.classList.add(className);
    },4000);
}
const authenticateUser = (temporalUser) => {
    validateEmail(temporalUser);
    validatePassword(temporalUser)
    
    var foundUser = users.find(user => user.email === temporalUser.email);
    if (!foundUser || foundUser.password !== temporalUser.password) throw new Error("Email or password wrong")
}
const addUserNameInHeader = (authenticatedEmail) => {
    let currentUser = users.find( user => user.email === authenticatedEmail);
    welcomeMessage.textContent = currentUser.name;
}
const resetUserNameInHeader = () => { 
    welcomeMessage.textContent = "Welcome ";
}
function updateUserPassword(email, password, newPassword, newPasswordConfirm) {
    validatePasswordsChanges(password,newPassword, newPasswordConfirm);

    let currentUser =  users.find(user => user.email === email);
    let currentUserIndex = users.findIndex(user => user.email === email);

    if (currentUser.password !== password.value) throw new Error("typed password isn't actual password user's value")
    if (password.value === newPassword.value) throw new Error("Password is equal than new password")
    if (newPassword.value !== newPasswordConfirm.value) throw new Error("New password and new password confirmation are not the same")

    users[currentUserIndex].password = newPassword.value;
}
const updateUserAvatar = (email, url) => { 
    validateEmailOnly(email);
    validateUrl(url);
    var foundUser = users.find(user => user.email === email);
    if (!foundUser) throw new Error("user not found");
    foundUser.avatar = url;
    console.log(users);
}

