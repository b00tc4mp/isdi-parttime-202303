//? LOGIC

//!REGISTER FUNCTIONS
const registerUser = (temporalUser) => {
    if (!temporalUser.name){
        throw new Error("Username is empty");
    }
    if (!temporalUser.email){
        throw new Error("Email is empty")
    }
    if (!temporalUser.password){
        throw new Error("Password is empty")
    }
    if(temporalUser.password.length < 4){
        throw new Error("Password is shorter than 4 characters");
    }
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
    if (!temporalUser.email){
        throw new Error("Empty email");
    }
    if (!temporalUser.password){
        throw new Error("Empty Password")
    }
    
    var foundUser = users.find(user => user.email === temporalUser.email);
    if (!foundUser || foundUser.password !== temporalUser.password){
        throw new Error("Email or password wrong")
    }
}


const addUserNameInHeader = (authenticatedEmail) => {
    let currentUser = users.find( user => user.email === authenticatedEmail);
    welcomeMessage.textContent = welcomeMessage.textContent + currentUser.name;
}
const resetUserNameInHeader = () => {
    welcomeMessage.textContent = "Welcome ";
}
function updateUserPassword(email, password, newPassword, newPasswordConfirm) {

    let currentUser =  users.find(user => user.email === email);
    let currentUserIndex = users.findIndex(user => user.email === email);

    if(!password.value){
        throw new Error("Password is empty")
    }
    if(!newPassword.value){
        throw new Error("New password is empty")
    }
    if(!newPasswordConfirm.value){
        throw new Error("New password confirmation is empty")
    }
    if (currentUser.password !== password.value){
        throw new Error("typed password isn't actual password user's value")
    }
    if (password.value === newPassword.value){
        throw new Error("Password is equal than new password")
    }
    if (newPassword.value !== newPasswordConfirm.value){
        throw new Error("New password and new password confirmation are not the same")
    }

    users[currentUserIndex].password = newPassword.value;

}

