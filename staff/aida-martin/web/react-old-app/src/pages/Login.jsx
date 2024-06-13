import { context } from '../ui'
import authenticateUser from '../logic/authenticateUser'

export default function Login ({ onRegisterClick, onUserLoggedIn }) {
  function handleRegisterClick (event) {
    event.preventDefault()

    onRegisterClick()
  }

  function handleLogin (event) {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value

    try {
      context.userId = authenticateUser(email, password)

      onUserLoggedIn()
    } catch (error) {
      console.log(error.message)
      // errorShow(registerError, error);
    }
  }

  return (
    <section className='login'>
      <h1 className='title'>WELCOME!</h1>

      <form className='form' onSubmit={handleLogin}>
        <input className='input' type='email' name='email' placeholder='Email' />

        <input
          className='input'
          type='password'
          name='password'
          placeholder='Password'
        />

        <a href='#' className='forgot-password-link'>Forgot password?</a>

        <p className='login-error error off' />

        <button className='button login-button'>LOG IN</button>
      </form>

      <p className='register-answer'>
        Not a member? <a href='#' onClick={handleRegisterClick} className='register-link'>Sign up here</a>
      </p>
    </section>
  )
}
