import { authenticateUser } from "../logic/authenticateUser"
import { context } from "../ui"

export default function Login({ onRegisterClick, onUserLoggedIn }) {
    const handleRegisterClick = event => {
        event.preventDefault()

        onRegisterClick()
    }

    const handleLogin = event => {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        try {
            authenticateUser(email, password, (error,userId) => {
                if(error) {
                    alert(error.message)

                    return
                }

                context.userId = userId
            })
            // const userId = authenticateUser(email, password)

            // 

            onUserLoggedIn()
        }catch (error) {
            alert(error.message)
        }
    }

    console.log('Login -> Render')

    return <div className="login">
        <header className="main-tittle">
            <img className="main-logo" src="../images/PunIntendedMain.png" />
        </header>
        <div className="page">
            <h1 className="text">Login</h1>
            <form className="login__form" onSubmit={handleLogin}>
                <div className="inputs__box">
                    <input className="form__input" type="email" name="email" placeholder="email" />
                    <div className="password-container">
                        <input className="form__input login__password" type="password" name="password" placeholder="password" />
                        <i className="login-eye fa-solid fa-eye"></i>
                    </div>
                </div>
                <button className="form__button" type="submit">Login</button>
            </form>    
            <p className="text">Go to <a className="login__anchor--register" href="" onClick={handleRegisterClick}>Register</a></p>
        </div>
    </div>
}