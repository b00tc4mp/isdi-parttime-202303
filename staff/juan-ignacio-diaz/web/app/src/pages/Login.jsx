import { context } from '../ui'
import authenticateUser from '../logic/authenticateUser'


export default function Login({ onRegisterClick, onUserLoggedIn, onMenssageAlert }) {
    function handleRegisterClick(event) {
        event.preventDefault()

        onRegisterClick()
    }

    function handleLogin(event) {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        try {
            authenticateUser(email, password, (error, userId) => {
                if (error) {
                    onMenssageAlert(error.message)

                    return
                }
                context.userId = userId

                onUserLoggedIn() 
            })
        }
        catch (error){
            onMenssageAlert(error.message)
        }   
    }

    console.log('Login -> render')
    
    return <>
        <div className="login page container">
            <h1 className="title">Login</h1>

            <form className="form" action="" onSubmit={handleLogin}>
                <input className="input" type="email" name="email" placeholder="usuario@dominio.com" /><br/>
                <input className="input" type="password" size="10" name="password" placeholder="password" /><br/>
                <button className = "button" type="submit">Login</button>
            </form>

            <p>Go to <a href="" onClick={handleRegisterClick}>Register</a></p>
        </div>
    </>
}