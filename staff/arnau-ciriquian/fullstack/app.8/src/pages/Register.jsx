import { registerUser } from "../logic/registerUser"
import { Form, ButtonForm } from "../library"

export default function Register({ onLoginClick, onUserRegistered }) {
    const handleLoginClick = event => {
        event.preventDefault()

        onLoginClick()
    }

    const handleResgiter = event => {
        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
        const passwordConfirmation = event.target.passwordConfirmation.value

        try {
            registerUser(name, email, password, passwordConfirmation)
                .then(() => onUserRegistered())
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    console.log('Register -> Render')

    return <div className="register">
        <header className="main-tittle">
            <img className="main-logo" src="./images/PunIntendedMain.png" />
        </header>
        <div className="page">
            <h1 className="text">Register</h1>
            <Form onSubmit={handleResgiter}>
                <div className="inputs__box">
                    <input className="form__input" type="text" name="name" placeholder="username" />
                    <input className="form__input" type="email" name="email" placeholder="email" />

                    <div className="password-container">
                        <input className="form__input register__password" type="password" name="password" placeholder="password" />
                        <i className="register-eye fa-solid fa-eye"></i>
                    </div>
                    <div className="password-container">
                        <input className="form__input register__password--confirm" type="password" name="passwordConfirmation" placeholder="password confirmation" />
                        <i className="register-confirm-eye fa-solid fa-eye"></i>
                    </div>
                </div>
                <ButtonForm type="submit">Register</ButtonForm>
            </Form>

            <p className="text">Go to <a className="register__anchor--login" href="" onClick={handleLoginClick}> Login</a></p>
        </div>
    </div>
}