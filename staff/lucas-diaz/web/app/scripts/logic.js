

// logic
const registerUser = (temporalUser) => {
    
    var foundUser = users.find(user => user.email === temporalUser.email);
    
    if (foundUser){
        return false;
    } 
    users.push(temporalUser);
    console.log(users);
    return true;
}

const cleanUser = (registerPage) => {
    registerPage.querySelector("input[type=text]").value = ""
    registerPage.querySelector("input[type=email]").value = ""
    registerPage.querySelector("input[type=password]").value = ""
}

const set3SecondsAdvice = (advice, className) => {
    setTimeout(() => {
        advice.classList.add(className);
    },4000);
}

const authenticateUser = (email, password) => {
        var foundUser
    
        for (var i = 0; i < users.length; i++) {
            var user = users[i]
    
            if (user.email === email) {
                foundUser = user
    
                break
            }
        }
    
        if (!foundUser || foundUser.password !== password)
            return false
    
        return true
        // WARN "nice", but not easy to read
        // return (!foundUser || foundUser.password !== password)? false : true
        // return !(!foundUser || foundUser.password !== password)      
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

    
    if (password.value !== currentUser.password){
        document.querySelector(".fail-current-password").classList.remove("off");
        set3SecondsAdvice(document.querySelector(".fail-current-password"), "off");
        return false;
    }

    if (password.value === newPassword.value){
        document.querySelector(".fail-coincidence").classList.remove("off");
        set3SecondsAdvice(document.querySelector(".fail-coincidence"),"off");
        return false; 
    }

    if (newPassword.value !== newPasswordConfirm.value){
        document.querySelector(".fail-password-match-advise").classList.remove("off");
        set3SecondsAdvice(document.querySelector(".fail-password-match-advise"), "off");
        return false;
    }
    users[currentUserIndex].password = newPassword.value;
    return true;
}