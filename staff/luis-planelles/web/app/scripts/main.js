const loginPage = document.querySelector(".login");
const loginForm = loginPage.querySelector("form");

const registerPage = document.querySelector(".register");
const registerForm = registerPage.querySelector("form");

const homePage = document.querySelector(".home");
const homeGrettings = homePage.querySelector(".grettings");
const homeLogOut = document.querySelector(".log-out");

const profileLink = homePage.querySelector(".link-profile");
const profileInfo = document.querySelector(".profile-info");

const updatePassword = document.querySelector(".update-passsword");
const updatePasswordForm = updatePassword.querySelector(".form");

let sessionUser = undefined;

//  Register page

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const registerName = registerForm.querySelector("input[name=name]").value;
  const registerEmail = registerForm.querySelector("input[name=email]").value;
  const registerPassword = registerForm.querySelector(
    "input[name=password]"
  ).value;

  try {
    registerUser(registerName, registerEmail, registerPassword);
    registerPage.classList.add("off");
    loginPage.classList.remove("off");
  } catch (error) {
    alert(error.message);
  }
});

registerPage.querySelector("a").addEventListener("click", (event) => {
  event.preventDefault();

  registerPage.classList.add("off");
  loginPage.classList.remove("off");
});

//  Login page

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const loginEmail = loginPage.querySelector("input[name=email]").value;
  const loginPassword = loginPage.querySelector("input[name=password]").value;

  try {
    sessionUser = authenticateUser(loginEmail, loginPassword);
    loginPage.classList.add("off");
    homePage.classList.remove("off");

    homeGrettings.innerHTML = `<p>Hello, ${sessionUser.info.name}!</p>`;
  } catch (error) {
    alert(error.message);
  }
});

loginPage.querySelector("a").addEventListener("click", (event) => {
  event.preventDefault();

  loginPage.classList.add("off");
  registerPage.classList.remove("off");
});

// Home page

profileLink.addEventListener("click", (event) => {
  event.preventDefault();

  profileInfo.innerHTML = `
  <p>${sessionUser.info.name}</p>
  <p>${sessionUser.email}</p>
`;
  updatePassword.classList.remove("off");
});

updatePasswordForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const password = updatePassword.querySelector("input[name=password]").value;
  const newPassword = updatePassword.querySelector(
    "input[name=newPassword]"
  ).value;
  const confirmPassword = updatePassword.querySelector(
    "input[name=newPasswordConfirm]"
  ).value;
  try {
    updateUserPassword(
      sessionUser.email,
      password,
      newPassword,
      confirmPassword
    );
  } catch (error) {
    alert(error.message);
  }
});

homeLogOut.addEventListener("click", (event) => {
  event.preventDefault();

  homePage.classList.add("off");
  loginPage.classList.remove("off");
});
