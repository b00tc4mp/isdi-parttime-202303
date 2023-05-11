import registerUser from '../logic/registerUser'

export default function Register ({ onLoginClick, onUserRegisteredIn }) {
  function handleLoginClick (event) {
    event.preventDefault()

    onLoginClick()
  }

  function handleRegister (event) {
    event.preventDefault()

    const name = event.target.name.value
    const email = event.target.email.value
    const password = event.target.password.value
    const repeatPassword = event.target.repeatpassword.value

    try {
      registerUser(name, email, password, repeatPassword)

      onUserRegisteredIn()
    } catch (error) {
      console.log(error.message)
      // errorShow(registerError, error);
    }
  }

  return (
    <section className='register'>
      <h1 className='title'>CREATE ACCOUNT</h1>

      <form className='form' onSubmit={handleRegister}>
        <input className='input' type='text' name='name' placeholder='Name' />

        <input className='input' type='text' name='email' placeholder='Email' />

        <input
          className='input'
          type='password'
          name='password'
          placeholder='Password'
        />

        <input
          className='input'
          type='password'
          name='repeatpassword'
          placeholder='Repeat password'
        />

        <p className='register-error error off' />

        <button className='button register-button'>SIGN UP</button>
      </form>

      <p className='login-answer'>
        Have already an account? <a href='#' onClick={handleLoginClick} className='login-link'>Login here</a>
      </p>
    </section>
  )
}
