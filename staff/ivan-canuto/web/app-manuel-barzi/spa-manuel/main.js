// data

var users = [];

users.push({
  name: "Wendy Darling",
  email: "wendy@darling.com",
  password: "123123123",
});

users.push({
  name: "Peter Pan",
  email: "peter@pan.com",
  password: "123123123",
});

users.push({
  name: "Pepito Grillo",
  email: "pepito@grillo.com",
  password: "123123123",
});

// logic

// presentation

let registerPage = document.querySelector(".register");
let loginPage = document.querySelector(".login");
let homePage = document.querySelector(".home");
let nameRegister = registerPage.querySelector("input[name=name]");
let emailRegister = registerPage.querySelector("input[name=email]");
let passwordRegister = registerPage.querySelector("input[name=password]");
let emailLogin = loginPage.querySelector("input[name=email]");
let passwordLogin = loginPage.querySelector("input[name=password]");

registerPage.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  if (!nameRegister || !passwordRegister) return alert('Por favor, rellene todos los campos.')

  for (let i = 0; i < users.length; i++) {
    if (users[i].name === nameRegister.value || users[i].email === emailRegister.value) return alert("Ya existe un usuario con este nombre");
  }

  if (passwordRegister.value.length < 6) return alert('Por favor introduzca una contraseña que contenga al menos 6 dígitos.')

  users.push({
    name: nameRegister.value,
    email: emailRegister.value,
    password: passwordRegister.value,
  });

  registerPage.classList.add("off");
  loginPage.classList.remove("off");
  console.log(users);
});




loginPage.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  let foundMember = false;

  for (let i = 0; i < users.length; i++) {
    if (emailLogin.value === users[i].email && passwordLogin.value === users[i].password) foundMember = true;
  }
  
  if (!foundMember) return alert('E-mail o contraseña incorrectos.')
    
  loginPage.classList.add("off");
  homePage.classList.remove("off");
});




registerPage.querySelector("a").addEventListener("click", function (event) {
  event.preventDefault();

  registerPage.classList.add("off");
  loginPage.classList.remove("off");
});

loginPage.querySelector("a").addEventListener("click", function (event) {
  event.preventDefault();

  loginPage.classList.add("off");
  registerPage.classList.remove("off");
});

