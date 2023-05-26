import PropTypes from 'prop-types'
import { registerUserFull } from '../logic/registerUser'

export default function Register({onLoginClick, onUserRegistered}) {
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
            registerUserFull(email, username, password, error => {
                if(error) {
                    alert(error.message)
                }
                
                document.querySelector('form').reset()
                onUserRegistered()
            })
        } catch(error){
            alert(error.message)
        }
    }
  
    return <div className="register-page">
    <h1 className="all-titles">REGISTER</h1>
    <form className="inputs" onSubmit={handleRegister}>
        <input className="input-field" type="text" name="name" placeholder="User name"/>
        <input className="input-field" type="email" name="email" placeholder="Email"/>
        <input className="input-field" type="password" name="password" placeholder="Password"/>
        <div className="secondary-text">Already registered? <a className="link" onClick={handleLoginClick}>Sign in</a></div>
        <button className="submit-buttons" type="submit">Register</button>
    </form>
    </div>
  }