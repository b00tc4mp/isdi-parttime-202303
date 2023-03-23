// data

let users = [];

// logic

// presentation
const registerPage = document.querySelector(".register");
const loginPage = document.querySelector(".login");
const homePage = document.querySelector(".home");

document
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

    if (repeatPassword !== password) {
      alert("Sorry! Your passwords have to match! 😥");
      return;
    }

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      repeatPassword === ""
    ) {
      alert("You have to fill in all the fields! 😥");
      return;
    }

    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      if (user.email === email) {
        alert("You are already registered! Please login! 😅");
        return;
      }
    }

    users.push({
      name: name,
      email: email,
      password: password,
    });

    registerPage.classList.add("off");

    loginPage.classList.remove("off");
  });

document
  .querySelector(".login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = loginPage.querySelector((input = "[name=email]")).value;
    const password = loginPage.querySelector((input = "[name=password]")).value;

    let foundUser;
    let match = false;

    for (let i = 0; i < users.length && match === false; i++) {
      let user = users[i];

      if (user.email === email) {
        foundUser = user;
        match = true;
      }
    }

    if (foundUser !== undefined && foundUser.password === password) {
      homePage.querySelector(".name").innerHTML = foundUser.name.toUpperCase();

      loginPage.classList.add("off");

      homePage.classList.remove("off");
    } else alert("Wrong email or password! 😥");
  });

registerPage.querySelector("a").addEventListener("click", function (event) {
  event.preventDefault();

  registerPage.classList.add("off");

  loginPage.classList.remove("off");
});

loginPage
  .querySelector(".register-link")
  .addEventListener("click", function (event) {
    event.preventDefault();

    registerPage.querySelector((input = "[name=name]")).value = "";
    registerPage.querySelector((input = "[name=email]")).value = "";
    registerPage.querySelector((input = "[name=password]")).value = "";
    registerPage.querySelector((input = "[name=repeat-password]")).value = "";

    loginPage.classList.add("off");

    registerPage.classList.remove("off");
  });
