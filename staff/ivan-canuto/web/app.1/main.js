const users = [];

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

const welcomePage = document.querySelector('.welcome-page');
const loginPage = document.querySelector('.login-page');
const registerPage = document.querySelector('.register-page');
const homePage = document.querySelector('.home-page');

const loginButton = document.querySelector('.login-button');
const registerButton = document.querySelector('.register-button');
const enterLoginButton = loginPage.querySelector('.enter-button');
const registerForm = registerPage.querySelector('.register-form');
const goBackLoginButton = loginPage.querySelector('.go-back');
const goBackRegisterButton = registerPage.querySelector('.go-back');

const loginEmail = loginPage.querySelector('.input-email');
const loginPassword = loginPage.querySelector('.input-password');
const registerName = registerPage.querySelector('.input-name');
const registerEmail = registerPage.querySelector('.input-email');
const registerPassword = registerPage.querySelector('.input-password');
const repeatedPassword = registerPage.querySelector('.repeated-password');

const alert = document.createElement('div');
alert.classList.add('alert');

const createAlert = (page, content)=> {
  page.appendChild(alert)
  alert.textContent = content;
  setTimeout(()=>{
    alert.remove()
  },3000)
}

loginButton.addEventListener('click', ()=>{
  welcomePage.classList.add('hidden');
  loginPage.classList.remove('hidden');
})

registerButton.addEventListener('click', ()=>{
  welcomePage.classList.add('hidden');
  registerPage.classList.remove('hidden');
})

console.log(registerName.value, registerEmail.value, registerPassword.value, repeatedPassword.value);
registerForm.addEventListener('submit', (e)=>{
  console.log(registerName.value, registerEmail.value, registerPassword.value, repeatedPassword.value);
  e.preventDefault();

  if (!registerName.value || !registerEmail.value || !registerPassword.value || !repeatedPassword.value) return createAlert(registerPage, 'Please, fill in all the fields.');

  for (let i = 0; i < users.length; i++) {
    if (registerEmail.value === users[i].email) return createAlert(registerPage, 'The email entered already belongs to an existing user.');
  };

  if (registerPassword.value.length < 6) return createAlert(registerPage,'The password must contain at least 6 letters.')
  if (registerPassword.value !== repeatedPassword.value) return createAlert(registerPage, 'The passwords entered are not the same.');

  users.push({
    name: registerName.value,
    email: registerEmail.value,
    password: registerPassword.value,
  });

  window.alert('User successfully registered.');
  
  registerPage.classList.add('hidden');
  loginPage.classList.remove('hidden');
});

enterLoginButton.addEventListener('click', (e)=>{
  e.preventDefault();

  if (!loginEmail || !loginPassword) return createAlert(loginPage, 'Please, fill in all the fields.');

  let foundClient = false;
  for (let i = 0; i < users.length; i++) {
    if (loginEmail === users[i].email && loginPassword === users[i].password) foundClient = true; 
  };

  if (foundClient) {
    loginPage.classList.add('hidden');
    homePage.classList.remove('hidden');
  } else return createAlert(loginPage, 'Wrong email or password.');
});

goBackLoginButton.addEventListener('click', ()=>{
  loginPage.classList.add('hidden');
  welcomePage.classList.remove('hidden');
});

goBackRegisterButton.addEventListener('click', ()=>{
  registerPage.classList.add('hidden');
  welcomePage.classList.remove('hidden');
});