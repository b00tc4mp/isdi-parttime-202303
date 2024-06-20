import authenticateUser from "../logic/authenticate-user.js"

export default function Login(props) {
    function handleRegisterClick(event) {
        event.preventDefault()
  
        props.onRegisterClick()
    }

    function logUserInClick(event) {
        event.preventDefault()

        const email = document.querySelector('input[name=email]').value
        const password = document.querySelector('input[name=password]').value
        
        try{
            const userId = authenticateUser(email, password)



            if(userId){
                props.onLoginAttemptClick(userId)
            }
        } catch(error) {
            alert(error.message)
        }
    }
  
    return <div className="login-page">
    <h1 className="all-titles">LOGIN</h1>
    <div className="red-text"></div>
    <form className="inputs">
            <input className="input-field" type="email" name="email" placeholder="Email"/>
            <input className="input-field" type="password" name="password" placeholder="Password"/>
            <div className="remember-me">
                <input className="checkbox" type="checkbox" name="remember-me"/>
                <div className="remember-me-text">Remember me</div>
            </div>
            <div className="forgot-password">Forgot your <a className="forgot-password-button">password</a>?</div>
            <div className="already-registered">Don't have an account? <a className="register-now-button" onClick={handleRegisterClick}>Register now</a></div>
            <button className="submit-buttons" type="submit" onClick={logUserInClick}>Login</button>
    </form>
    </div>
  }