import { registerUserFull } from "../logic/register-user.js"

export default function Register(props) {
    function handleLoginClick(event) {
        event.preventDefault()
  
        props.onLoginClick()
    }

    function registerUserClick(event) {
        event.preventDefault()

        try{
            const email = document.querySelector('input[name=email]').value
            const username = document.querySelector('input[name=name]').value
            const password = document.querySelector('input[name=password]').value
    
            registerUserFull(email, username, password)
            document.querySelector('form').reset()
        } catch(error){
            alert(error.message)
        }
    }
  
    return <div className="register-page">
    <h1 className="all-titles">REGISTER</h1>
    <div className="red-text"></div>
    <form className="inputs">
        <input className="input-field" type="text" name="name" placeholder="User name"/>
        <input className="input-field" type="email" name="email" placeholder="Email"/>
        <input className="input-field" type="password" name="password" placeholder="Password"/>
        <div className="secondary-text">Already registered? <a className="go-to-sign-in" onClick={handleLoginClick}>Sign in</a></div>
        <button className="submit-buttons" type="submit" onClick={registerUserClick}>Register</button>
    </form>
    </div>
  }