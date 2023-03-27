var users = [];

users.push({
  name: 'Wendy Darling',
  email: 'wendy@darling.com',
  password: '123123123',
});

users.push({
  name: 'Peter Pan',
  email: 'peter@pan.com',
  password: '123123123',
});

users.push({
  name: 'Pepito Grillo',
  email: 'pepito@grillo.com',
  password: '123123123',
});

var registerPage = document.querySelector('.register');
var loginPage = document.querySelector('.login');
var homePage = document.querySelector('.home');
var profilePage = document.querySelector('.profile');
let userName;

registerPage.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();
  let name = registerPage.querySelector('input[name=name]').value;
  let email = registerPage.querySelector('input[name=email]').value;
  let password = registerPage.querySelector('input[name=password]').value;

  if (name === '') {
    alert('complete el campo nombre');
    return;
  }
  if (name.length < 4) {
    alert('campo nombre debe contener mas de 3 caracteres');
    return;
  }

  if (/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(password)) {
    alert('el password es valido');
    validarEmail(email);
  } else alert(' password no valido:La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.NO puede tener otros símbolos.');
  return;

  function validarEmail(valor) {
    if (/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(valor)) {
      alert('La dirección de email ' + valor + ' es correcta.');
      if (users.some((element) => element.email === email)) {
        alert(
          ` el usuario con el email: ${email} esiste,por favor rectifique los datos  `
        );

        // registerPage.classList.add('off');
        // loginPage.classList.remove('off');
        // registerPage.querySelector('form').reset();
      } else {
        users.push({
          name: name,
          email: email,
          password: password,
        });

        alert(` el email ${email} ha sido creado satistactoriamente`);
        console.log('nuevo usuario', users);
        console.log(name, email, password, 'las tres');
        registerPage.querySelector('form').reset();
      }
    } else {
      alert(
        'La dirección de email es incorrecta, rectifique que contiene solo letras minusculas, contine @,  ....'
      );
    }
  }
});

loginPage.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();
  var email = loginPage.querySelector('input[name=email]').value;
  var password = loginPage.querySelector('input[name=password]').value;

  console.log(users, 'users');
  var foundUser;
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    if (user.email === email) {
      foundUser = user;
      console.log(foundUser, 'founduser');
      break;
    }
  }
  if (foundUser !== undefined && foundUser.password === password) {
    loginPage.classList.add('off');
    homePage.classList.remove('off');
    userName = foundUser.name;
    console.log(userName, 'este es el nombre del usuario registrado');
    document.querySelector(
      '.home--user'
    ).innerHTML = `Bienvenido ${userName.toUpperCase()}`;
  } else alert('wrong email or password');
});

profilePage.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();
  console.log('envio evento');
  let oldPassword = profilePage.querySelector(
    'input[name=currentPassword]'
  ).value;
  console.log(oldPassword);
  let newPassword = profilePage.querySelector('input[name=newPassword]').value;
  console.log(newPassword);
  let passwordConfirm = profilePage.querySelector(
    'input[name=passwordConfirm]'
  ).value;
  console.log(passwordConfirm);
  verifyUser(userName, oldPassword);

  //verificar que para ese usuario es ese password

  function verifyUser(userName, currentPassword) {
    console.log(userName.password);
    console.log(currentPassword);

    let index = users.findIndex((element) => element.name === userName);
    console.log(index, 'indexde l usuario en el array');
    if (users[index].password !== currentPassword) {
      console.log('ese password no es el de ese usuario, verifiquelo');
      return;
    } else if (newPassword !== passwordConfirm) {
      console.log(
        'rectifique las nuevas contraseñas, tienen que ser las mismas'
      );
      return;
    } else {
      users[index].password = newPassword;
      console.log(users);
      alert(
        `el password del usuario ${userName} se ha actualixado correctamente`
      );
    }
  }

  // if (users.find(userName) => UserName.passwors === currentPassword) {

  //   verificar que los dos passwords nuevos con iguales

  //si son iguales sobreescribo
});

registerPage.querySelector('a').addEventListener('click', function (event) {
  event.preventDefault();
  registerPage.classList.add('off');
  loginPage.classList.remove('off');
});

loginPage.querySelector('a').addEventListener('click', function (event) {
  event.preventDefault();
  loginPage.classList.add('off');
  registerPage.classList.remove('off');
});

homePage.querySelector('a').addEventListener('click', function (event) {
  event.preventDefault();
  homePage.classList.add('off');
  profilePage.classList.remove('off');
});
