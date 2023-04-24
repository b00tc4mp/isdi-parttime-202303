import { registerUser } from '../logic/register-user.js';
import { displayRegisterError } from '../ui/errors.js';
import { controlUsernameInput, setAlert } from '../ui/general-tools.js';
import { changeView } from '../ui/login.js';

export default function initRegisterForm(changeViewLink, register, login) {
    const registerForm = document.querySelector('.login-page__register__form');
    const usernameRegister = registerForm.querySelector('input[name="username"]');

    const doRegister = () => {
        const user = usernameRegister.value;
        const username = '@' + user.toLowerCase();
        console.log(user)
        const mail = registerForm.querySelector('input[name="mail"]').value;
        const password = registerForm.querySelector('input[name="password"]').value;
        const repeatPassword = registerForm.querySelector('input[name="repeat-password"]').value;
        registerUser(mail, username, password, repeatPassword);
        changeView(changeViewLink, register, login);
        return user
    };

    usernameRegister.addEventListener('input', (event) => {
        controlUsernameInput(usernameRegister);
    });

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        try {
            let registeredUser = doRegister();
            const message = `Hello, ${registeredUser}! Your account is registered. You can sign in now!`;
            setAlert('success', message, 'Done!')
        } catch (error) {
            displayRegisterError(error.message, registerForm);
        }
    });
}