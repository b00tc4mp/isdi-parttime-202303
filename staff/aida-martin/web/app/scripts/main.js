import {
  registerUser,
  authenticateUser,
  retrieveUser,
  changePassword,
  updateAvatar,
} from "./logic.js";

import { show, hidden, toggle } from "./ui.js";

const registerPage = document.querySelector(".register");
const registerForm = registerPage.querySelector(".form");

const loginPage = document.querySelector(".login");
const loginForm = loginPage.querySelector(".form");

const homePage = document.querySelector(".home");

const profilePanel = document.querySelector(".profile");
const changePasswordForm = profilePanel.querySelector(".profile-password-form");
const changeAvatarForm = profilePanel.querySelector(".profile-avatar-form");

let authenticatedUserId;

registerForm.onsubmit = function (event) {
  event.preventDefault();

  const name = event.target.name.value;
  const email = event.target.email.value;
  const password = event.target.password.value;
  const repeatPassword = event.target.repeatpassword.value;
  const registerError = registerPage.querySelector(".register-error");

  try {
    registerUser(name, email, password, repeatPassword);

    hidden(registerPage);
    show(loginPage);
  } catch (error) {
    if (error.cause === "userError") {
      show(registerError);
      registerError.innerText = error.message;
      return;
    }
    console.log(error);
  }
};

registerPage.querySelector("a").onclick = function () {
  loginForm.reset();

  hidden(registerPage);
  show(loginPage);
};

loginForm.onsubmit = function (event) {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;
  const loginError = loginPage.querySelector(".error");

  try {
    authenticatedUserId = authenticateUser(email, password);

    const user = retrieveUser(authenticatedUserId);

    homePage.querySelector(".profile-link").innerText = user.name;

    loginForm.reset();

    hidden(loginError, loginPage);
    show(homePage);
  } catch (error) {
    if (error.cause === "userError") {
      show(loginError);
      loginError.innerText = error.message;
      return;
    }
    console.log(error);
  }
};

loginPage.querySelector(".register-link").onclick = function () {
  const error = loginPage.querySelector(".error");
  const registerError = registerPage.querySelector(".register-error");

  registerForm.reset();

  hidden(registerError, error, loginPage);
  show(registerPage);
};

homePage.querySelector(".profile-link").onclick = function (event) {
  event.preventDefault();

  toggle(profilePanel);
};

homePage.querySelector(".profile-logout-button").onclick = function () {
  authenticatedUserId = undefined;

  hidden(homePage, profilePanel);
  show(loginPage);
};

changePasswordForm.onsubmit = function (event) {
  event.preventDefault();

  const password = event.target.oldpassword.value;
  const newPassword = event.target.newpassword.value.trim();
  const newPasswordConfirm = event.target.repeatnewpassword.value.trim();
  const changePasswordError = profilePanel.querySelector(
    ".change-password-error"
  );

  try {
    changePassword(
      authenticatedUserId,
      password,
      newPassword,
      newPasswordConfirm
    );

    hidden(profilePanel);
    changePasswordForm.reset();
  } catch (error) {
    if (error.cause === "userError") {
      show(changePasswordError);
      changePasswordError.innerText = error.message;
      return;
    }
    console.log(error);
  }
};

changeAvatarForm.onsubmit = function (event) {
  event.preventDefault();

  const avatar = event.target.url.value;
  const changeAvatarError = profilePanel.querySelector(".update-avatar-error");

  try {
    updateAvatar(authenticatedUserId, avatar);

    homePage.querySelector("img").src = avatar;

    hidden(profilePanel);
    show(homePage);
  } catch (error) {
    if (error.cause === "userError") {
      show(changeAvatarError);
      changeAvatarError.innerText = error.message;
      return;
    }
    console.log(error);
  }
};
