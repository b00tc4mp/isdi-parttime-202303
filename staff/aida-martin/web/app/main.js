const registerPage = document.querySelector(".register");
const loginPage = document.querySelector(".login");
const homePage = document.querySelector(".home");
let username;
let authenticated;
let authenticatedEmail;

registerPage
  .querySelector(".register-form")
  .addEventListener("submit", function (event) {
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

    const result = registerUser(name, email, password, repeatPassword);

    registerError.classList.remove("off");

    if (password.length < 8) {
      registerError.innerHTML =
        "Your password must have at least 8 characters 😥";
      return;
    }

    if (repeatPassword !== password) {
      registerError.innerHTML = "Your passwords have to match! 😥";
      return;
    }

    if (!name || !email || !password || !repeatPassword) {
      registerError.innerHTML = "You have to fill in all the fields! 😥";
      return;
    }

    if (result === false) {
      registerError.innerHTML = "You are already registered! Please login! 😅";
      return;
    }

    registerPage.classList.add("off");

    loginPage.classList.remove("off");
  });

loginPage
  .querySelector(".login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = loginPage.querySelector((input = "[name=email]")).value;
    const password = loginPage.querySelector((input = "[name=password]")).value;
    const error = loginPage.querySelector(".error");

    let result = authenticateUser(email, password);

    if (result === false) {
      error.innerHTML = "Wrong email or password! 😥";
      error.classList.remove("off");
      return;
    }

    authenticatedEmail = email;
    authenticated = true;

    homePage.querySelector(".name").innerHTML = username;

    error.classList.add("off");

    loginPage.classList.add("off");

    homePage.classList.remove("off");
  });

registerPage.querySelector("a").addEventListener("click", function () {
  loginPage.querySelector((input = "[name=email]")).value = "";
  loginPage.querySelector((input = "[name=password]")).value = "";

  registerPage.classList.add("off");

  loginPage.classList.remove("off");
});

loginPage
  .querySelector(".register-link")
  .addEventListener("click", function () {
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
  });
