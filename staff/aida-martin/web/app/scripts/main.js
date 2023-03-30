const registerPage = document.querySelector(".register");
const registerForm = registerPage.querySelector(".form");

const loginPage = document.querySelector(".login");
const loginForm = loginPage.querySelector(".form");

const homePage = document.querySelector(".home");

const profilePanel = document.querySelector(".profile");
const changePasswordForm = profilePanel.querySelector(".profile-password-form");
const changeAvatarForm = profilePanel.querySelector(".profile-avatar-form");

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

    hidden(loginError, loginPage);
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

  hidden(registerError, error, loginPage);
  show(registerPage);
};

homePage.querySelector(".profile-link").onclick = function (event) {
  event.preventDefault();

  toggle(profilePanel);
};

homePage.querySelector(".profile-logout-button").onclick = function () {
  authenticatedEmail = undefined;

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
      authenticatedEmail,
      password,
      newPassword,
      newPasswordConfirm
    );

    hidden(profilePanel);
    changePasswordForm.reset();
  } catch (error) {
    show(changePasswordError);
    changePasswordError.innerText = error.message;
  }
};

changeAvatarForm.onsubmit = function (event) {
  event.preventDefault();

  const avatar = event.target.url.value;

  updateAvatar(authenticatedEmail, avatar);

  homePage.querySelector("img").src = avatar;

  hidden(profilePanel);
  show(homePage);
};
