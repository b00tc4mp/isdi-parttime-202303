export const toggleOff = (...items) => {
    items.forEach((item) => {
      item.classList.toggle('off');
    });
};

const clearInitialForm = () => {
    document.querySelector('input[name="username"]').value = '';
    document.querySelector('input[name="mail"]').value = '';
    document.querySelector('input[name="password"]').value = '';
    document.querySelector('input[name="confirm-password"]').value = '';
};

export const changeView = (register, login) => {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach((alertUser) => alertUser.classList.add('off'));
    clearInitialForm();
    toggleOff(register, login);
}

export const registerUser = (register, login) => {
    const username = document.querySelector('input[name="username"]').value;
    const alertUser = document.querySelector('.login-alert');
    toggleOff(register, login);
    alertUser.classList.remove('off');
    alertUser.classList.add('alert-success');
    alertUser.innerHTML = `Your user has been created ${username}. You can sign in now!<span class="close-alert">X</span>`;
    const closeAlert = document.querySelector('.close-alert');
    closeAlert.addEventListener('click', (event) => {
        event.preventDefault();
        alertUser.classList.add('off');
    })
}

