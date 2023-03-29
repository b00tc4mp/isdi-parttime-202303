//? LOGIC

//!REGISTER FUNCTIONS
const registerUser = (temporalUser) => {
    if (!temporalUser.name) throw new Error("Username is empty");
    if ( typeof temporalUser.name !== "string") throw new Error("Username is not a string");
    if (temporalUser.name === " ") throw new Error("Username cant be a blankSpace")
    if (!temporalUser.email) throw new Error("Email is empty")
    if ( typeof temporalUser.email !== "string") throw new Error("Email is not a string");
    if (temporalUser.email === " ") throw new Error("Email cant be a blankSpace")
    if (!temporalUser.password) throw new Error("Password is empty")
    if ( typeof temporalUser.password !== "string") throw new Error("Password is not a string");
    if (temporalUser.password === " ") throw new Error("Password cant be a blankSpace")
    if(temporalUser.password.length < 4) throw new Error("Password is shorter than 4 characters");
    // TODO añadir validaciones de email con @ y cosas de esas.
    var foundUser = users.find(user => user.email === temporalUser.email);
    if (foundUser){
        throw new Error("This name already exist");
    }
    users.push(temporalUser);
}

//! CLEAN THINGS FUNCTIONS --> they can be tools i guess 
const cleanUser = (registerPage) => {
    registerPage.querySelector("input[type=text]").value = ""
    registerPage.querySelector("input[type=email]").value = ""
    registerPage.querySelector("input[type=password]").value = ""
}
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
    if (!temporalUser.email) throw new Error("Email is empty")
    if ( typeof temporalUser.email !== "string") throw new Error("Email is not a string");
    if (temporalUser.email === " ") throw new Error("Email cant be a blankSpace")
    if (!temporalUser.password) throw new Error("Password is empty")
    if (temporalUser.password === " ") throw new Error("Password cant be a blankSpace")
    
    var foundUser = users.find(user => user.email === temporalUser.email);
    if (!foundUser || foundUser.password !== temporalUser.password) throw new Error("Email or password wrong")
}
const addUserNameInHeader = (authenticatedEmail) => {
    let currentUser = users.find( user => user.email === authenticatedEmail);
    welcomeMessage.textContent = welcomeMessage.textContent + currentUser.name;
}
const resetUserNameInHeader = () => {
    welcomeMessage.textContent = "Welcome ";
}
function updateUserPassword(email, password, newPassword, newPasswordConfirm) {
    if(!password.value) throw new Error("Password is empty")
    if(!newPassword.value) throw new Error("New password is empty")
    if(!newPasswordConfirm.value) throw new Error("New password confirmation is empty")

    let currentUser =  users.find(user => user.email === email);
    let currentUserIndex = users.findIndex(user => user.email === email);

    if (currentUser.password !== password.value) throw new Error("typed password isn't actual password user's value")
    if (password.value === newPassword.value) throw new Error("Password is equal than new password")
    if (newPassword.value !== newPasswordConfirm.value) throw new Error("New password and new password confirmation are not the same")

    users[currentUserIndex].password = newPassword.value;
}

