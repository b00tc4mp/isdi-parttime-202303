import { authenticateUser } from "../logic/authenticateUser"
import { useEffect, useState } from "react"
import retrieveRandomJoke from "../logic/retriveRandomJoke"
import "./login.css"
import { Form, ButtonForm } from "../library"

export default function Login({ onRegisterClick, onUserLoggedIn }) {
    const [joke, setJoke] = useState(null)

    useEffect(() => {
        try {
            retrieveRandomJoke((error, joke) => {
                if (error) {
                    alert(error.message)

                    return
                }

                setJoke(joke)
            })
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const handleRegisterClick = event => {
        event.preventDefault()

        onRegisterClick()
    }

    const handleLogin = event => {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        try {
            authenticateUser(email, password)
                .then(() => onUserLoggedIn())
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    console.log('Login -> Render')

    return <div className="login">
        <header className="main-tittle">
            <img className="main-logo" src="../images/PunIntendedMain.png" />
            <h2>Cooking dad jokes since 1991</h2>
        </header>
        <div className="page">
            <h1 className="text">Login</h1>
            <Form /*className="login__form"*/ onSubmit={handleLogin}>
                <div className="inputs__box">
                    <input className="form__input" type="email" name="email" placeholder="email" />
                    <div className="password-container">
                        <input className="form__input login__password" type="password" name="password" placeholder="password" />
                        <i className="login-eye fa-solid fa-eye"></i>
                    </div>
                </div>
                <ButtonForm type="submit">Login</ButtonForm>
            </Form>
            <p className="text">Go to <a className="login__anchor--register" href="" onClick={handleRegisterClick}>Register</a></p>
            <div className="joke__container">
                {joke && <p><q>{joke}</q></p>}
            </div>
        </div>
    </div>
}