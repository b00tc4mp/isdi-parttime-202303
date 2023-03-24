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
};

const resetAlertStyles = (alertUser) => {
  alertUser.classList.remove('alert-success');
  alertUser.classList.remove('alert-warning');
  alertUser.classList.remove('alert-danger');
  alertUser.classList.add('off');
};

export const resetAlerts = () => {
  const alerts = document.querySelectorAll('.alert');
  if (alerts.length > 0) {
    alerts.forEach((alertUser) => resetAlertStyles(alertUser));
  };
};

export const setAlert = (alertArea, alertColor, alertMessage) => {
  const alertUser = document.querySelector(`.${alertArea}`);
  alertUser.innerHTML = `${alertMessage}<span class='close-alert'>x</span>`;
  alertUser.classList.add(alertColor);
  alertUser.classList.remove('off');
  const closeAlert = document.querySelector(`.${alertArea}`).querySelector('.close-alert');
  closeAlert.addEventListener('click', (event) => {
    event.preventDefault();
    alertUser.classList.add('off');
  });
};

export const setSimpleAlert = (alertArea, alertColor, alertMessage) => {
  const alertUser = document.querySelector(`.${alertArea}`);
  alertUser.innerHTML = `${alertMessage}`;
  alertUser.classList.add(`${alertColor}--simple`);
  alertUser.classList.remove('off');
};
