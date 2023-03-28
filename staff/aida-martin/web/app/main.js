const registerPage = document.querySelector(".register");
const loginPage = document.querySelector(".login");
const homePage = document.querySelector(".home");
const profilePage = document.querySelector(".profile");
const changePasswordPage = document.querySelector(".change-password");
let authenticatedEmail;

registerPage.querySelector(".register-form").onsubmit = function (event) {
  event.preventDefault();

  const name = registerPage.querySelector((input = "[name=name]")).value;
  const email = registerPage.querySelector((input = "[name=email]")).value;
  const password = registerPage.querySelector(
    (input = "[name=password]")
  ).value;
  const repeatPassword = registerPage.querySelector(
    (input = "[name=repeat-password]")
  ).value;
  const registerError = registerPage.querySelector(".register-error");

  registerError.classList.remove("off");

  try {
    registerUser(name, email, password, repeatPassword);

    registerPage.classList.add("off");
    loginPage.classList.remove("off");
  } catch (error) {
    registerError.innerText = error.message;
  }
};

loginPage.querySelector(".login-form").onsubmit = function (event) {
  event.preventDefault();

  const email = loginPage.querySelector((input = "[name=email]")).value;
  const password = loginPage.querySelector((input = "[name=password]")).value;
  const loginError = loginPage.querySelector(".error");

  try {
    authenticateUser(email, password);

    authenticatedEmail = email;

    let foundUser = retrieveUser(email);

    homePage.querySelector(".name").innerText = foundUser.name;

    loginPage.querySelector((input = "[name=email]")).value = "";
    loginPage.querySelector((input = "[name=password]")).value = "";

    loginError.classList.add("off");

    loginPage.classList.add("off");

    homePage.classList.remove("off");
  } catch (error) {
    loginError.classList.remove("off");
    loginError.innerText = error.message;
  }
};

registerPage.querySelector("a").onclick = function () {
  loginPage.querySelector((input = "[name=email]")).value = "";
  loginPage.querySelector((input = "[name=password]")).value = "";

  registerPage.classList.add("off");

  loginPage.classList.remove("off");
};

loginPage.querySelector(".register-link").onclick = function () {
  const error = loginPage.querySelector(".error");

  const registerError = registerPage.querySelector(".register-error");

  registerPage.querySelector((input = "[name=name]")).value = "";
  registerPage.querySelector((input = "[name=email]")).value = "";
  registerPage.querySelector((input = "[name=password]")).value = "";
  registerPage.querySelector((input = "[name=repeat-password]")).value = "";

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

profilePage.querySelector(".profile-change-password").onclick = function () {
  profilePage.classList.add("off");

  changePasswordPage.classList.remove("off");
};

changePasswordPage.querySelector(".change-password-form").onsubmit = function (
  event
) {
  event.preventDefault();

  const email = authenticatedEmail;
  const password = changePasswordPage.querySelector(
    (input = "[name=old-password]")
  ).value;
  const newPassword = changePasswordPage.querySelector(
    (input = "[name=new-password]")
  ).value;
  const newPasswordConfirm = changePasswordPage.querySelector(
    (input = "[name=repeat-new-password]")
  ).value;
  const changePasswordError = changePasswordPage.querySelector(
    ".change-password-error"
  );

  try {
    changePassword(email, password, newPassword, newPasswordConfirm);

    changePasswordPage.querySelector((input = "[name=old-password]")).value =
      "";
    changePasswordPage.querySelector((input = "[name=new-password]")).value =
      "";
    changePasswordPage.querySelector(
      (input = "[name=repeat-new-password]")
    ).value = "";

    changePasswordPage.classList.add("off");
    homePage.classList.remove("off");
  } catch (error) {
    changePasswordError.classList.remove("off");
    changePasswordError.innerText = error.message;
  }
};

homePage.querySelector(".profile-logout").onclick = function () {
  homePage.classList.add("off");

  loginPage.classList.remove("off");
};
