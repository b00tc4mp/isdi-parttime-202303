import PropTypes from 'prop-types'
import { registerUserFull } from '../logic/registerUser'

export default function Register({onLoginClick}) {
    Register.propTypes = {
        onLoginClick: PropTypes.func
    }
    
    function handleLoginClick(event) {
        event.preventDefault()
  
        onLoginClick()
    }

    function handleRegister(event) {
        event.preventDefault()

        const email = event.target.email.value
        const username = event.target.name.value
        const password = event.target.password.value

        try{
            registerUserFull(email, username, password)
    
            document.querySelector('form').reset()
        } catch(error){
            alert(error.message)
        }
    }
  
    return <div className="register-page">
    <h1 className="all-titles">REGISTER</h1>
    <div className="red-text"></div>
    <form className="inputs" onSubmit={handleRegister}>
        <input className="input-field" type="text" name="name" placeholder="User name"/>
        <input className="input-field" type="email" name="email" placeholder="Email"/>
        <input className="input-field" type="password" name="password" placeholder="Password"/>
        <div className="secondary-text">Already registered? <a className="go-to-sign-in" onClick={handleLoginClick}>Sign in</a></div>
        <button className="submit-buttons" type="submit">Register</button>
    </form>
    </div>
  }