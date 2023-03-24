

// logic
const registerUser = (temporalUser) => {
    
    var foundUser = users.find(user => user.email === temporalUser.email);
    
    if (foundUser){
        return false;
    } 
    users.push(foundUser);
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

