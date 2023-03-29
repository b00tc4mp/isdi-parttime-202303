const registerPage = document.querySelector(".register");
const registerForm = registerPage.querySelector(".register-form");

const loginPage = document.querySelector(".login");
const loginForm = document.querySelector(".login-form");

const homePage = document.querySelector(".home");

const profilePage = document.querySelector(".profile");
const changePasswordPage = document.querySelector(".change-password");
const changePasswordForm = changePasswordPage.querySelector(
  ".change-password-form"
);

let authenticatedEmail;

registerForm.onsubmit = function (event) {
  event.preventDefault();

  const name = event.target.name.value.trim();
  const email = event.target.email.value.trim();
  const password = event.target.password.value.trim();
  const repeatPassword = event.target.repeatpassword.value.trim();
  const registerError = registerPage.querySelector(".register-error");

  try {
    registerUser(name, email, password, repeatPassword);

    registerPage.classList.add("off");
    loginPage.classList.remove("off");
  } catch (error) {
    registerError.classList.remove("off");
    registerError.innerText = error.message;
  }
};

registerPage.querySelector("a").onclick = function () {
  loginForm.reset();

  registerPage.classList.add("off");
  loginPage.classList.remove("off");
};

loginForm.onsubmit = function (event) {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;
  const loginError = loginPage.querySelector(".error");

  try {
    authenticateUser(email, password);

    authenticatedEmail = email;

    let user = retrieveUser(email);

    homePage.querySelector(".profile-link").innerText = user.name;

    loginError.classList.add("off");
    loginPage.classList.add("off");
    homePage.classList.remove("off");
  } catch (error) {
    loginError.classList.remove("off");
    loginError.innerText = error.message;
  }
};

loginPage.querySelector(".register-link").onclick = function () {
  const error = loginPage.querySelector(".error");
  const registerError = registerPage.querySelector(".register-error");

  registerForm.reset();

  registerError.classList.add("off");
  error.classList.add("off");
  loginPage.classList.add("off");
  registerPage.classList.remove("off");
};

homePage.querySelector(".profile-link").onclick = function (event) {
  event.preventDefault();

  homePage.classList.add("off");
  profilePage.classList.remove("off");
};

homePage.querySelector(".profile-logout").onclick = function () {
  authenticatedEmail = undefined;

  homePage.classList.add("off");

  loginPage.classList.remove("off");
};

profilePage.querySelector(".profile-change-password").onclick = function () {
  profilePage.classList.add("off");
  changePasswordPage.classList.remove("off");
};

changePasswordPage.querySelector(".change-password-form").onsubmit = function (
  event
) {
  event.preventDefault();

  const password = event.target.oldpassword.value;
  const newPassword = event.target.newpassword.value;
  const newPasswordConfirm = event.target.repeatnewpassword.value;
  const changePasswordError = changePasswordPage.querySelector(
    ".change-password-error"
  );

  try {
    changePassword(
      authenticatedEmail,
      password,
      newPassword,
      newPasswordConfirm
    );

    changePasswordPage.classList.add("off");
    homePage.classList.remove("off");
  } catch (error) {
    changePasswordError.classList.remove("off");
    changePasswordError.innerText = error.message;
  }
};
