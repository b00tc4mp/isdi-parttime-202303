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

    hidden(registerPage);
    show(loginPage);
  } catch (error) {
    show(registerError);
    registerError.innerText = error.message;
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
    authenticateUser(email, password);

    authenticatedEmail = email;

    let user = retrieveUser(email);

    homePage.querySelector(".profile-link").innerText = user.name;

    loginForm.reset();

    hidden(loginError);
    hidden(loginPage);
    show(homePage);
  } catch (error) {
    show(loginError);
    loginError.innerText = error.message;
  }
};

loginPage.querySelector(".register-link").onclick = function () {
  const error = loginPage.querySelector(".error");
  const registerError = registerPage.querySelector(".register-error");

  registerForm.reset();

  hidden(registerError);
  hidden(error);
  hidden(loginPage);
  show(registerPage);
};

homePage.querySelector(".profile-link").onclick = function (event) {
  event.preventDefault();

  hidden(homePage);
  show(profilePage);
};

homePage.querySelector(".profile-logout").onclick = function () {
  authenticatedEmail = undefined;

  hidden(homePage);

  show(loginPage);
};

profilePage.querySelector(".profile-change-password").onclick = function () {
  hidden(profilePage);
  show(changePasswordPage);
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

    alert("Your password has been changed 🥰");

    changePasswordForm.reset();

    hidden(changePasswordPage);
    show(homePage);
  } catch (error) {
    show(changePasswordError);
    changePasswordError.innerText = error.message;
  }
};

profilePage.querySelector(".profile-avatar-form").onsubmit = function (event) {
  event.preventDefault();

  const avatar = event.target.url.value;

  updateAvatar(authenticatedEmail, avatar);

  homePage.querySelector("img").src = avatar;

  hidden(profilePage);
  show(homePage);
};
