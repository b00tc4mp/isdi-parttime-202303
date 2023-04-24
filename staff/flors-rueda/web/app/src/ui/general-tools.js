import { svg } from '../../assets/svg-paths.js';
import { retrieveUser, } from '../logic/retrieve-user.js';

export const context = sessionStorage

export const toggleOff = (...items) => {
  items.forEach((item) => {
    item.classList.toggle('off');
  });
};

export const setOff = (...items) => {
  items.forEach((item) => {
    item.classList.add('off');
  });
};

export const setOn = (...items) => {
  items.forEach((item) => {
    item.classList.remove('off');
  });
};

export const clearForms = () => {
  const inputs = document.querySelectorAll('input');
  inputs.forEach((input) => (input.value = ''));
  inputs.forEach((input) => (input.classList.remove('invalid-input')));
  const textAreas = document.querySelectorAll('textarea');
  textAreas.forEach((area) => (area.value = ''));
  const filesInputs = document.querySelectorAll('input[type="file"]');
  filesInputs.forEach((input) => (input.value = ''));
};

export const resetAlert = (alert) => {
  alert.classList.remove('success');
  alert.classList.remove('warning');
  alert.classList.remove('danger');
  alert.classList.add('off');
  const inputs = document.querySelectorAll('input');
  inputs.forEach((input) => (input.classList.remove('invalid-input')));
};

export const setAlert = (alertColor, alertMessage, alertTitle) => {
  const alert = document.querySelector('.alert');
  resetAlert(alert)
  const svgAlert = alert.querySelector('svg').querySelector('path')
  alertColor === 'danger' ? svgAlert.setAttribute('d', svg.ko) : svgAlert.setAttribute('d', svg.happy) 
  alert.querySelector('h2').innerText = alertTitle
  alert.querySelector('p').innerHTML = alertMessage
  alert.classList.add(alertColor);
  alert.classList.remove('off');
  const closeAlert = alert.querySelector('.alert__right--close');
  closeAlert.addEventListener('click', (event) => {
    event.preventDefault();
    alert.classList.add('off');
    resetAlert(alert)
  });
};


export const setPredeterminateAvatar = (userAuth) => {
  if (userAuth) {
    const user = retrieveUser(userAuth);
    document.querySelector('.avatar').src = user.avatar;
  } else {
    document.querySelector('.avatar').src = 'https://www.slotcharter.net/wp-content/uploads/2020/02/no-avatar.png';
  };
};

export const getImgUrl = (event, callback) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

export const controlUsernameInput = (input) => {
  let username = '';
  const regexRule = /^[a-zA-Z0-9]*$/;
  if(!regexRule.test(input.value)) {
    username = input.value.slice(0, -1);
  } else {
    username = input.value
  }
  input.value = username
};

export const stripHTML = (text) => {
  const regexRule = /(<([^>]+)>)/ig;
  return text.replace(regexRule, '');
};

