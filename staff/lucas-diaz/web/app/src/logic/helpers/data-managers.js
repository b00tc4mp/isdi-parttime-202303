export const vanishWarningIn3Seconds = (advice, className) => {
    setTimeout(() => {
        advice.classList.add(className);
    },4000);
}

export const cleanChangePasswordForm = () => {
    document.querySelector(".old-password").value ="";
    document.querySelector(".new-password").value = "";
    document.querySelector(".new-password-repetition").value = "";
}


