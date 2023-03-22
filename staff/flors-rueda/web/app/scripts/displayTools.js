export const toggleOff = (...items) => {
    items.forEach((item) => {
      item.classList.toggle("off");
    });
};

export const setOff = (...items) => {
    items.forEach((item) => {
      item.classList.add("off");
    });
};

export const changeView = (register, login) => {
    //TODO figure out why this doesn't work (alerts = undefined)
    const alerts = [document.querySelectorAll(".register-alert"), document.querySelectorAll(".login-alert")];
    console.log(alerts)
    toggleOff(alerts);
    toggleOff(register, login);
}

export const registerUser = (register, login) => {
    const username = document.querySelector(".username").value;
    const alert = document.querySelector(".login-alert");
    toggleOff(register, login);
    alert.classList.remove("off");
    alert.classList.add("alert-success");
    alert.innerHTML = `Your user has been created ${username}. You can sign in now!<span class="close-alert">X</span>`
    const closeAlert = document.querySelector(".close-alert");
    closeAlert.addEventListener("click", (event) => {
        event.preventDefault();
        setOff(alert);
    })
}